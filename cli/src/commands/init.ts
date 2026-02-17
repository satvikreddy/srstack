import type { Command } from "commander";
import { addFromTanstackStack } from "../utils/github.js";
import { installShadcnComponents } from "../utils/terminal.js";

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

      installShadcnComponents(["sidebar", "sonner"]);

      console.log("Done.");
    });
}
