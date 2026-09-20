import { createHash } from "node:crypto";
import { cp, mkdir, readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const pointerPath = path.join(repositoryRoot, "production-current.json");
const pointer = JSON.parse(await readFile(pointerPath, "utf8"));

if (!/^\d{4}-\d{2}-\d{2}$/.test(pointer.snapshot ?? "")) {
  throw new Error("production-current.json must contain a YYYY-MM-DD snapshot");
}

const snapshotRoot = path.join(
  repositoryRoot,
  "production-snapshots",
  pointer.snapshot,
);
const staticRoot = path.join(snapshotRoot, "static");
const manifestPath = path.join(snapshotRoot, "SHA256SUMS");

async function listFiles(directory, relativeRoot = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const relativePath = path.posix.join(relativeRoot, entry.name);
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(absolutePath, relativePath)));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }

  return files;
}

const manifest = new Map();
for (const line of (await readFile(manifestPath, "utf8")).trim().split("\n")) {
  const match = line.match(/^([a-f0-9]{64})  \.\/(.+)$/);
  if (!match) throw new Error(`Invalid SHA256SUMS line: ${line}`);
  manifest.set(match[2], match[1]);
}

const files = await listFiles(staticRoot);
if (files.length !== manifest.size) {
  throw new Error(
    `Manifest lists ${manifest.size} files but snapshot contains ${files.length}`,
  );
}

for (const relativePath of files) {
  const expectedHash = manifest.get(relativePath);
  if (!expectedHash) throw new Error(`Manifest is missing ${relativePath}`);

  const file = await readFile(path.join(staticRoot, relativePath));
  const actualHash = createHash("sha256").update(file).digest("hex");
  if (actualHash !== expectedHash) {
    throw new Error(
      `Integrity check failed for ${relativePath}: ${actualHash} != ${expectedHash}`,
    );
  }
}

console.log(`Verified ${files.length} files in snapshot ${pointer.snapshot}`);

if (!process.argv.includes("--verify-only")) {
  const outputRoot = path.join(repositoryRoot, "dist", "production");
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(path.dirname(outputRoot), { recursive: true });
  await cp(staticRoot, outputRoot, { recursive: true });
  console.log(`Built ${path.relative(repositoryRoot, outputRoot)}`);
}
