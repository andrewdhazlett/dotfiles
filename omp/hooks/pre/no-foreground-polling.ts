/**
 * Blocks foreground polling in every top-level omp session, whatever its role
 * (orchestrator, implementation delegate, reviewer). Subagents are exempt: a
 * background subagent or an `async` bash job is where waiting belongs, because
 * its result is delivered to the parent without holding the conversation.
 *
 * Kept deliberately small: a `tool_call` handler that throws blocks every tool.
 */
import type {ExtensionAPI} from '@oh-my-pi/pi-coding-agent';

const REASON =
  'Blocked by no-foreground-polling: a top-level session never sleeps, watches, or waits in the foreground. ' +
  'Start the wait as a background job (`bash` with `async: true`) or hand it to a background subagent, then end the turn; ' +
  'the result is delivered automatically.';

// `sleep 5`, `gh run watch`, `gh pr checks --watch`, `watch -n`, `tail -f`.
const SHELL_POLL =
  /(?:^|[\s;&|(])sleep\s+[\d.$]|\bgh\s+run\s+watch\b|\s--watch\b|(?:^|[\s;&|(])watch\s+-|\btail\s+(?:-\w*\s+)*-\w*[fF]\b/;

// The deputy's blocking primitive; never a top-level session's, async or not.
const WORKERS_WAIT = /\bworkers\.py\b[^;&|\n]*\swait\b/;

// `time.sleep(`, `asyncio.sleep(`, `Bun.sleep(`, `Bun.sleepSync(`, and shell sleeps run through `sh(...)`.
const CODE_POLL =
  /\b(?:time|asyncio|Bun)\.sleep(?:Sync)?\s*\(|(?:^|[\s;&|("'`])sleep\s+[\d.$]|\bgh\s+run\s+watch\b|\s--watch\b/;

export const isForegroundPoll = (
  toolName: string,
  input: Record<string, unknown>,
): boolean => {
  if (toolName === 'bash') {
    const command = typeof input.command === 'string' ? input.command : '';
    if (WORKERS_WAIT.test(command)) return true;
    const background = input.async === true || typeof input.name === 'string';
    return !background && SHELL_POLL.test(command);
  }
  if (toolName === 'eval') {
    const code = typeof input.code === 'string' ? input.code : '';
    return WORKERS_WAIT.test(code) || CODE_POLL.test(code);
  }
  return false;
};

export default function noForegroundPolling(pi: ExtensionAPI): void {
  pi.on('tool_call', (event, ctx) => {
    if (ctx.agent?.kind === 'sub') return undefined;
    return isForegroundPoll(event.toolName, event.input)
      ? {block: true, reason: REASON}
      : undefined;
  });
}
