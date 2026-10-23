// Shows the active billing profile in the footer: "WORK" (error colour) when
// OMO_PROFILE=work, as the work-repos .envrc sets (direnv); "PERSONAL" (accent
// colour) when it is unset, i.e. the subscription logins in ~/.omo/agent.
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const PROFILE = process.env.OMO_PROFILE || "personal";

export default function (pi: ExtensionAPI) {
  pi.on("session_start", async (_event, ctx) => {
    const theme = ctx.ui.theme;
    const color = PROFILE === "personal" ? "accent" : "error";
    ctx.ui.setStatus("profile", theme.bold(theme.fg(color, PROFILE.toUpperCase())));
  });
}
