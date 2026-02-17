import { mkdir, writeFile, access } from "fs/promises";
import { dirname } from "path";

/**
 * Downloads a file from a raw GitHub URL and writes it to the destination path.
 * Creates parent directories if they don't exist.
 * Skips the file if it already exists (unless `overwrite` is true).
 */
export async function downloadFile(
  url: string,
  dest: string,
  overwrite = false
): Promise<void> {
  if (!overwrite) {
    const exists = await access(dest)
      .then(() => true)
      .catch(() => false);
    if (exists) {
      console.log(`  skipped  ${dest} (already exists)`);
      return;
    }
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`
    );
  }

  const content = await response.text();
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, content, "utf8");
  console.log(`  created  ${dest}`);
}
