import type { Command } from "commander";
import {
  addFromTanstackStack,
  blindCopyFromTanstackStackSrc,
} from "../utils/github.js";
import { ensureFormatScript } from "../utils/packageJson.js";
import {
  installDeps,
  installShadcnComponents,
  runFormat,
} from "../utils/terminal.js";

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

      installDeps(["zod", "zustand"]);

      await blindCopyFromTanstackStackSrc([
        "routes/__root.tsx",

        "components/app-button.tsx",
        "components/app-header.tsx",
        "components/app-layout.tsx",
        "components/app-navbar-bottom.tsx",
        "components/app-provider.tsx",
        "components/app-sidebar.tsx",
        "components/app-state-provider.tsx",

        "features/auth/permissions.types.ts",
        "features/navigation/nav-config.tsx",

        "utils/serverFn.util.ts",
        "utils/env.util.ts",

        "middleware/auth-middleware.ts",
        "middleware/error-handler-middleware.ts",

        "lib/analytics/analytics-events.ts",
        "lib/analytics/analytics.client.ts",
        "lib/analytics/analytics.server.ts",
        "lib/analytics/analytics.ts",
        "lib/analytics/analytics.types.ts",
        "lib/analytics/index.ts",

        "siteConfig.ts",
        "start.ts",
      ]);

      await ensureFormatScript();

      installShadcnComponents(["sidebar", "sonner", "sidebar"]);

      runFormat();

      console.log("Done.");
    });
}
