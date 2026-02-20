import type { Command } from "commander";
import { blindCopyFromTanstackStackSrc } from "../utils/github.js";
import { installDeps, runFormat } from "../utils/terminal.js";

export function registerAddTable(program: Command): void {
  program
    .command("add-table")
    .description("Scaffold a table component into the project")
    .action(async () => {
      console.log("Adding table...");

      installDeps(["@tanstack/react-table"]);

      await blindCopyFromTanstackStackSrc([
        "components/table/columns/base.column.tsx",
        "components/table/columns/json.column.tsx",
        "components/table/columns/number.column.tsx",
        "components/table/columns/price.column.tsx",
        "components/table/columns/text.column.tsx",
        "components/table/app-table.tsx",
        "components/ui/table.tsx",
        "routes/table.tsx",
        "utils/price.util.ts",
      ]);

      runFormat();

      console.log("Done.");
    });
}
