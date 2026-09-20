import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const manifest = JSON.parse(
  await readFile(path.join(repositoryRoot, "package.json"), "utf8"),
);

if (manifest.workspaces !== undefined) {
  throw new Error("Static production must not declare package-manager workspaces");
}

for (const dependencyField of [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
]) {
  if (Object.keys(manifest[dependencyField] ?? {}).length > 0) {
    throw new Error(
      `Static production must not declare ${dependencyField}; found ${Object.keys(manifest[dependencyField]).join(", ")}`,
    );
  }
}

const forbiddenFiles = new Set([
  "npm-shrinkwrap.json",
  "package-lock.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "yarn.lock",
]);
const violations = [];

async function inspect(directory, relativeRoot = "") {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "dist") {
      continue;
    }

    const relativePath = path.posix.join(relativeRoot, entry.name);
    if (entry.isDirectory() && entry.name === "node_modules") {
      violations.push(relativePath);
      continue;
    }

    if (entry.isDirectory()) {
      await inspect(path.join(directory, entry.name), relativePath);
    } else if (
      forbiddenFiles.has(entry.name) ||
      (entry.name === "package.json" && relativePath !== "package.json")
    ) {
      violations.push(relativePath);
    }
  }
}

await inspect(repositoryRoot);

if (violations.length > 0) {
  throw new Error(
    `Inactive dependency graph files are not allowed:\n${violations.sort().join("\n")}`,
  );
}

console.log("Verified dependency-free static production boundary");
