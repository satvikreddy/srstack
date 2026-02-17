import type { Command } from "commander";
import { addFromTanstackStack } from "../utils/github.js";

export function registerAddForm(program: Command): void {
  program
    .command("add-form")
    .description("Scaffold a form component into the project")
    .action(async () => {
      console.log("Adding form...");

      await addFromTanstackStack([
        {
          from: "src/components/example.tsx",
          to: "src/components/example.tsx",
        },
      ]);
      
      console.log("Done.");
    });
}
