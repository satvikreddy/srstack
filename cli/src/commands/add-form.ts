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

      installShadcnComponents([
        "switch",
        "calendar",
        "popover",
        "textarea",
        "select",
        "command",
        "combobox",
      ]);

      installDeps(["@tanstack/react-form"]);

      await blindCopyFromTanstackStackSrc([
        "components/form/app-form.tsx",
        "components/form/date-field.tsx",
        "components/form/date-time-field.tsx",
        "components/form/field.tsx",
        "components/form/field.types.ts",
        "components/form/price-field.tsx",
        "components/form/select-field.tsx",
        "components/form/switch-field.tsx",
        "components/form/text-field.tsx",
        // "components/form/form.md"
        "routes/form.tsx",

        "components/ui/button.tsx",
        "components/ui/calendar.tsx",
        "components/ui/combobox.tsx",
        "components/ui/field-styles.tsx",
        "components/ui/input-group.tsx",
        "components/ui/input.tsx",
        "components/ui/select.tsx",
      ]);

      runFormat();

      console.log("Done.");
    });
}
