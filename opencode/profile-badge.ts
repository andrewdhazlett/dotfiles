// Shows the active billing profile beside the prompt: " WORK " (error colour)
// when OPENCODE_PROFILE=work, as a work-repos .envrc sets (direnv);
// " PERSONAL " (accent colour) when it is unset, i.e. the global logins.
import { createElement, insert, setProp } from "@opentui/solid";

// The slice of opencode's TUI plugin API (v1) this plugin touches; theme
// colours are opaque renderer values passed straight back to setProp.
interface TuiApi {
  theme: { current: { background: unknown; accent: unknown; error: unknown } };
  slots: { register(registration: { order: number; slots: Record<string, () => unknown> }): void };
  renderer: { requestRender(): void };
}

const PROFILE = process.env.OPENCODE_PROFILE || "personal";
const BOLD = 1;

export default {
  id: "dotfiles.profile-badge",
  tui: async (api: TuiApi) => {
    const badge = () => {
      const theme = api.theme.current;
      const element = createElement("text");
      setProp(element, "fg", theme.background);
      setProp(element, "bg", PROFILE === "personal" ? theme.accent : theme.error);
      setProp(element, "attributes", BOLD);
      insert(element, ` ${PROFILE.toUpperCase()} `);
      return element;
    };

    api.slots.register({
      order: 0,
      slots: { home_prompt_right: badge, session_prompt_right: badge },
    });
    api.renderer.requestRender();
  },
};
