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
        "components/table/columns/base.column.ts",
        "components/table/columns/json.column.ts",
        "components/table/columns/number.column.ts",
        "components/table/columns/price.column.ts",
        "components/table/columns/text.column.ts",
        "components/table/app-table.tsx",
        "components/ui/table.tsx",
        "routes/table.tsx",
        "utils/price.util.ts",
      ]);

      runFormat();

      console.log("Done.");
    });
}
