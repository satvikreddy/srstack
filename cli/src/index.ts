#!/usr/bin/env node

import { Command } from "commander";
import { registerAddForm } from "./commands/add-form.js";
import { registerAddConvex } from "./commands/add-convex.js";
import { registerInit } from "./commands/init.js";
import { registerAddClerk } from "./commands/add-clerk.js";
import { registerAddAi } from "./commands/add-ai.js";
import { registerAddTable } from "./commands/add-table.js";

const program = new Command();

program
  .name("srstack")
  .description("CLI for scaffolding TanStack Start projects")
  .version("0.1.0");

registerInit(program);
registerAddAi(program);
registerAddClerk(program);
registerAddConvex(program);
registerAddForm(program);
registerAddTable(program);

program.parse(process.argv);
