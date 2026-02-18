import type { Command } from "commander";
import { blindCopyFromTanstackStackSrc } from "../utils/github.js";
import {
  installDeps,
  installDevDeps,
  runFormat,
} from "../utils/terminal.js";

export function registerAddForm(program: Command): void {
  program
    .command("add-table")
    .description("Add ai to your project")
    .action(async () => {
      console.log("Adding ai...");

      installDeps([
        "@tanstack/ai",
        "@tanstack/ai-client",
        "@tanstack/ai-react",
      ]);
      installDevDeps(["@tanstack/react-ai-devtools"]);

      await blindCopyFromTanstackStackSrc([
        // "components/data-table/.tsx",
      ]);

      runFormat();

      console.log("Done.");
    });
}
