#!/usr/bin/env node

import { Command } from "commander";
import { registerAddForm } from "./commands/add-form.js";
import { registerAddConvex } from "./commands/add-convex.js";
import { registerInit } from "./commands/init.js";

const program = new Command();

program
  .name("srstack")
  .description("CLI for scaffolding TanStack Start projects")
  .version("0.1.0");

registerInit(program);
registerAddForm(program);
registerAddConvex(program);

program.parse(process.argv);
