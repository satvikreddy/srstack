import { spawnSync } from "node:child_process";

export function installDeps(deps: string[]): void {
  if (deps.length === 0) return;
  console.log(`Running: pnpm add ${deps.join(" ")}`);
  const result = spawnSync("pnpm", ["add", ...deps], {
    stdio: "inherit",
    shell: true,
  });
  if (result.status !== 0) {
    throw new Error("pnpm add failed");
  }
}

export function installShadcnComponents(components: string[]): void {
  if (components.length === 0) return;
  console.log(`Running: npx shadcn@latest add ${components.join(" ")}`);
  const result = spawnSync(
    "npx",
    ["shadcn@latest", "add", ...components],
    { stdio: "inherit", shell: true }
  );
  if (result.status !== 0) {
    throw new Error("shadcn add failed");
  }
}
