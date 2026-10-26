"""Hindsight operation validator that scrubs retain content before anything is stored.

Runs at API ingress (sync and async retain), so the document text, chunks, the
async task payload, and extracted facts all see only the scrubbed text.

Configuration (environment):
  HINDSIGHT_API_OPERATION_VALIDATOR_EXTENSION=scrub_retain:ScrubRetainValidator
  HINDSIGHT_API_OPERATION_VALIDATOR_DENYLIST=/path/to/denylist.txt

Denylist format, one entry per line (`#` comments and blank lines ignored):
  literal                  case-insensitive, ASCII-token-bounded match
  re:<python regex>        raw regex, no implicit flags
  <entry> => replacement   optional; default replacement is "[work]"
Entries apply in file order, so list specific names before their prefixes.

Fails closed: a missing or invalid denylist stops the server from starting,
and a failed reload rejects the retain instead of storing unscrubbed text.
The file is re-read when its mtime changes.
"""

from __future__ import annotations

import os
import re
from dataclasses import dataclass
from typing import Any

from hindsight_api.extensions import (
    OperationValidatorExtension,
    ValidationResult,
    apply_redaction,
)
from hindsight_api.extensions.operation_validator import (
    RecallContext,
    ReflectContext,
    RetainContext,
)

DEFAULT_REPLACEMENT = "[work]"
_TOKEN_START = r"(?<![A-Za-z0-9_])"
_TOKEN_END = r"(?![A-Za-z0-9_])"


@dataclass(frozen=True)
class Rule:
    pattern: re.Pattern[str]
    replacement: str


def parse_denylist(text: str) -> list[Rule]:
    rules: list[Rule] = []
    for lineno, raw in enumerate(text.splitlines(), 1):
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        entry, sep, replacement = line.partition("=>")
        entry = entry.strip()
        replacement = replacement.strip() if sep else DEFAULT_REPLACEMENT
        try:
            if entry.startswith("re:"):
                pattern = re.compile(entry[3:])
            else:
                pattern = re.compile(_TOKEN_START + re.escape(entry) + _TOKEN_END, re.IGNORECASE)
        except re.error as e:
            raise ValueError(f"denylist line {lineno}: {e}") from None
        rules.append(Rule(pattern, replacement))
    if not rules:
        raise ValueError("denylist has no entries")
    return rules


class ScrubRetainValidator(OperationValidatorExtension):
    def __init__(self, config: dict[str, str]):
        super().__init__(config)
        path = config.get("denylist")
        if not path:
            raise ValueError("HINDSIGHT_API_OPERATION_VALIDATOR_DENYLIST is not set")
        self._path = path
        self._mtime = -1.0
        self._rules: list[Rule] = []
        self._load()

    def _load(self) -> None:
        mtime = os.stat(self._path).st_mtime
        if mtime == self._mtime:
            return
        with open(self._path, encoding="utf-8") as f:
            self._rules = parse_denylist(f.read())
        self._mtime = mtime

    def scrub(self, text: str) -> str:
        text = apply_redaction(text).content
        for rule in self._rules:
            text = rule.pattern.sub(rule.replacement, text)
        return text

    def _scrub_value(self, value: Any) -> Any:
        if isinstance(value, str):
            return self.scrub(value)
        if isinstance(value, list):
            return [self._scrub_value(v) for v in value]
        if isinstance(value, dict):
            return {k: self._scrub_value(v) for k, v in value.items()}
        return value

    async def validate_retain(self, ctx: RetainContext) -> ValidationResult:
        try:
            self._load()
        except (OSError, ValueError) as e:
            return ValidationResult.reject(f"retain scrubber unavailable: {e}", status_code=503)
        contents = []
        for item in ctx.contents:
            item = dict(item)
            for key in ("content", "context", "tags", "metadata"):
                if key in item and item[key] is not None:
                    item[key] = self._scrub_value(item[key])
            contents.append(item)
        return ValidationResult.accept_with(contents=contents)

    async def validate_recall(self, ctx: RecallContext) -> ValidationResult:
        return ValidationResult.accept()

    async def validate_reflect(self, ctx: ReflectContext) -> ValidationResult:
        return ValidationResult.accept()
