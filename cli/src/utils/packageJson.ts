import { readFile, writeFile } from "fs/promises";
import { join } from "path";

/**
 * Updates the format script in package.json at the project root (cwd).
 * Replaces "format": "prettier" with "format": "prettier --write .".
 * Skips if package.json doesn't exist or format script is already correct.
 */
export async function ensureFormatScript(): Promise<void> {
  const pkgPath = join(process.cwd(), "package.json");
  let content: string;
  try {
    content = await readFile(pkgPath, "utf8");
  } catch {
    return; // package.json not found, skip
  }

  const pkg = JSON.parse(content) as { scripts?: Record<string, string> };
  if (!pkg.scripts?.format) return;

  if (pkg.scripts.format === "prettier") {
    pkg.scripts.format = "prettier --write .";
    await writeFile(pkgPath, JSON.stringify(pkg, null, 2), "utf8");
    console.log("  updated  package.json (format script)");
  }
}
