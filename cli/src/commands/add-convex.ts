import type { Command } from "commander";
import {
  blindCopyFromTanstackStackConvex,
  blindCopyFromTanstackStackSrc,
} from "../utils/github.js";
import { installDeps } from "../utils/terminal.js";

export function registerAddConvex(program: Command): void {
  program
    .command("add-convex")
    .description("Scaffold Convex integration files into the project")
    .action(async () => {
      console.log("Adding Convex...");

      installDeps(["convex", "fluent-convex", "zod", "convex-helpers"]);

      await blindCopyFromTanstackStackConvex([
        "schema.ts",
        "todo.ts",
        "lib/builder.ts",
        "lib/todo/index.ts",
      ]);

      await blindCopyFromTanstackStackSrc([
        "integrations/convex/app-convex-provider.tsx",
        "integrations/convex/convex.ts",
        "routes/convex.tsx",
      ]);

      console.log("Done.");
    });
}
