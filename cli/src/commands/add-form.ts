import type { Command } from "commander";
import { blindCopyFromTanstackStackSrc } from "../utils/github.js";
import {
  installDeps,
  installShadcnComponents,
  runFormat,
} from "../utils/terminal.js";

export function registerAddForm(program: Command): void {
  program
    .command("add-form")
    .description("Scaffold a form component into the project")
    .action(async () => {
      console.log("Adding form...");

      installShadcnComponents(["switch"]);

      installDeps(["@tanstack/react-form"]);

      await blindCopyFromTanstackStackSrc([
        "components/form/app-form.tsx",
        "components/form/field.tsx",
        "components/form/field.types.ts",
        "components/form/switch-field.tsx",
        // "components/form/form.md"
        "routes/form.tsx",
      ]);

      runFormat();

      console.log("Done.");
    });
}
