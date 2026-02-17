import { downloadFile } from "./download.js";

const REPO_BASE = "https://raw.githubusercontent.com/satvikreddy/srstack/main";

/**
 * Builds the raw GitHub URL for a file in the srstack repo.
 *
 * @param repoPath - Path relative to the repo root, e.g. "tanstack-start/src/components/form.tsx"
 */
export function srStackUrl(repoPath: string): string {
  return `${REPO_BASE}/${repoPath.replace(/^\//, "")}`;
}

/**
 * Downloads a file from the srstack repo and writes it to `dest` in the current project.
 *
 * @param repoPath - Path of the file relative to the srstack repo root
 * @param dest     - Destination path relative to cwd where the file should be written
 * @param overwrite - Whether to overwrite an existing file (default: false)
 */
export async function addFromTanstackStack(
  args: {
    from: string;
    to: string;
    overwrite?: boolean;
  }[]
): Promise<void> {
  for (const arg of args) {
    await downloadFile(
      srStackUrl("tanstack-start/" + arg.from),
      arg.to,
      arg.overwrite ?? false
    );
  }
}
