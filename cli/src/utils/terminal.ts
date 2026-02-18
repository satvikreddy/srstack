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

export function installDevDeps(deps: string[]): void {
  if (deps.length === 0) return;
  console.log(`Running: pnpm add -D ${deps.join(" ")}`);
  const result = spawnSync("pnpm", ["add", "-D", ...deps], {
    stdio: "inherit",
    shell: true,
  });
  if (result.status !== 0) {
    throw new Error("pnpm add -D failed");
  }
}

export function installShadcnComponents(components: string[]): void {
  if (components.length === 0) return;
  console.log(`Running: npx shadcn@latest add ${components.join(" ")}`);
  const result = spawnSync("npx", ["shadcn@latest", "add", ...components], {
    stdio: "inherit",
    shell: true,
  });
  if (result.status !== 0) {
    throw new Error("shadcn add failed");
  }
}

/**
 * Runs the format script from package.json (e.g. "prettier --write .").
 * Uses npm run format; skips silently if the script does not exist.
 */
export function runFormat(): void {
  console.log("Running: npm run format");
  const result = spawnSync("npm", ["run", "format"], {
    stdio: "inherit",
    shell: true,
  });
  if (result.status !== 0) {
    console.warn(
      "npm run format failed or format script not found (non-fatal)",
    );
  }
}
