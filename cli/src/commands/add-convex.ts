import type { Command } from "commander";
import { addFromTanstackStack, blindCopyFromTanstackStackConvex } from "../utils/github.js";
import { installDeps } from "../utils/terminal.js";

export function registerAddConvex(program: Command): void {
  program
    .command("add-convex")
    .description("Scaffold Convex integration files into the project")
    .action(async () => {
      console.log("Adding Convex...");

      installDeps(["convex", "fluent-convex", "zod", "convex-helpers"]);

      await addFromTanstackStack([
        {
          from: "convex/schema.ts",
          to: "convex/schema.ts",
        },
        {
          from: "convex/functions.ts",
          to: "convex/functions.ts",
        },
      ]);
   
      await blindCopyFromTanstackStackConvex([
        'schema.ts',
        'todo.ts',
        
        'lib/builder.ts',
      ])

      console.log("Done.");
    });
}
