// gta6-clipper-01 — entry program (Node 22, standard library only).
//
// The entry is a public YouTube Short: a 41-second vertical cut of
// Rockstar's official GTA 6 Trailer 2 (1:36-2:08) with a make.fun pitch.
// This program does exactly one thing: it copies VIDEO.json from the
// repository root into the harness output directory, unchanged, so the
// house can read the video's address from /output/VIDEO.json.
// It uses no network and no dependencies beyond the Node standard library.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)));
const VIDEO_NAME = "VIDEO.json";

function outputDirectory(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) {
    return resolve(fromEnv);
  }
  return join(REPO_ROOT, "out");
}

function main(): void {
  const source = join(REPO_ROOT, VIDEO_NAME);
  if (!existsSync(source)) {
    console.error(`missing ${VIDEO_NAME} in ${REPO_ROOT}`);
    process.exit(1);
  }
  const info = statSync(source);
  if (!info.isFile()) {
    console.error(`${VIDEO_NAME} is not a regular file`);
    process.exit(1);
  }
  // Fail loudly on malformed JSON instead of copying a broken link file.
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(source, "utf8"));
  } catch (error) {
    console.error(`${VIDEO_NAME} is not valid JSON: ${(error as Error).message}`);
    process.exit(1);
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    console.error(`${VIDEO_NAME} must be a JSON object with a "url" string`);
    process.exit(1);
  }
  const url = (parsed as Record<string, unknown>).url;
  if (typeof url !== "string" || url.length === 0) {
    console.error(`${VIDEO_NAME} must hold a non-empty "url" string`);
    process.exit(1);
  }
  const outDir = outputDirectory();
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, VIDEO_NAME);
  copyFileSync(source, target);
  // Verify the copy is byte-identical; a partial copy must fail loudly.
  const before = readFileSync(source);
  const after = readFileSync(target);
  if (!before.equals(after)) {
    console.error(`copy of ${VIDEO_NAME} differs from the source`);
    process.exit(1);
  }
  console.log(`copied ${VIDEO_NAME} -> ${target} (${before.length} bytes, verified)`);
}

main();
