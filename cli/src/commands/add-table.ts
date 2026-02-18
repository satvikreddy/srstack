import type { Command } from "commander";
import { blindCopyFromTanstackStackSrc } from "../utils/github.js";
import {
  installDeps,
  installShadcnComponents,
  runFormat,
} from "../utils/terminal.js";

export function registerAddForm(program: Command): void {
  program
    .command("add-table")
    .description("Scaffold a table component into the project")
    .action(async () => {
      console.log("Adding table...");

      installShadcnComponents(["table"]);

      installDeps(["@tanstack/react-table"]);

      await blindCopyFromTanstackStackSrc([
        // "components/data-table/.tsx",
      ]);

      runFormat();

      console.log("Done.");
    });
}
