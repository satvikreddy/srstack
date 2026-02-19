import type { Command } from "commander";
import {
  addFromTanstackStack,
  blindCopyFromTanstackStackSrc,
} from "../utils/github.js";
import { installDeps } from "../utils/terminal.js";

export function registerAddClerk(program: Command): void {
  program
    .command("add-clerk")
    .description("Scaffold Clerk integration files into the project")
    .action(async () => {
      installDeps(["@clerk/tanstack-react-start"]);

      await blindCopyFromTanstackStackSrc([
        "integrations/clerk/app-clerk-provider.tsx",
        "features/auth/permissions.types.ts",
        "routes/clerk.tsx"
      ]);

      await addFromTanstackStack([
        {
          from: "src/middleware/auth-middleware-clerk.ts",
          to: "src/middleware/auth-middleware.ts",
          overwrite: true,
        },
      ]);

      console.log("Done.");
    });
}
