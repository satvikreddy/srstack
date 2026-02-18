import type { Command } from "commander";
import {
  addFromTanstackStack,
  blindCopyFromTanstackStackSrc,
} from "../utils/github.js";
import { ensureFormatScript } from "../utils/packageJson.js";
import { installShadcnComponents, runFormat } from "../utils/terminal.js";

export function registerInit(program: Command): void {
  program
    .command("init")
    .description("Initialize a new TanStack Start project")
    .action(async () => {
      console.log("Initializing TanStack Start project...");
      await addFromTanstackStack([
        {
          from: ".vscode/settings.json",
          to: ".vscode/settings.json",
        },
      ]);

      await blindCopyFromTanstackStackSrc([
        "utils/serverFn.util.ts",
        "middleware/auth-middleware.ts",
        "middleware/error-handler-middleware.ts",

        "lib/analytics/analytics-events.ts",
        "lib/analytics/analytics.client.ts",
        "lib/analytics/analytics.server.ts",
        "lib/analytics/analytics.ts",
        "lib/analytics/analytics.types.ts",
        "lib/analytics/index.ts",

        "components/app-button.tsx",

        "start.ts",
      ]);

      await ensureFormatScript();

      installShadcnComponents(["sidebar", "sonner"]);

      runFormat();

      console.log("Done.");
    });
}
