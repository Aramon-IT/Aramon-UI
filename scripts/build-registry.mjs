import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "registry.json");
const outputDirectory = path.join(root, "apps/docs/public/r");
const checkOnly = process.argv.includes("--check");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const items = manifest.items ?? [];
const itemNames = new Set(items.map((item) => item.name));

if (itemNames.size !== items.length) throw new Error("Registry item names must be unique.");

function consumerContent(sourcePath, content) {
  if (sourcePath.endsWith("focus-vessel.tsx") || sourcePath.endsWith("dialog.tsx")) {
    return content
      .replace('from "@aramon/medium/react"', 'from "./medium/react"')
      .replace('from "@aramon/medium"', 'from "./medium/core"');
  }
  return content;
}

for (const item of items) {
  for (const dependency of item.registryDependencies ?? []) {
    if (!itemNames.has(dependency)) throw new Error(`${item.name} references missing registry dependency ${dependency}.`);
  }
  for (const file of item.files ?? []) {
    const sourcePath = path.resolve(root, file.path);
    if (!sourcePath.startsWith(`${root}${path.sep}`)) throw new Error(`Registry source escapes the repository: ${file.path}`);
    await access(sourcePath);
    if (!file.target?.startsWith("~/")) throw new Error(`Registry target must begin with ~/: ${item.name}/${file.path}`);
  }
}

if (checkOnly) {
  console.log(`Registry valid: ${items.length} items.`);
  process.exit(0);
}

await mkdir(outputDirectory, { recursive: true });

const publicCatalog = {
  ...manifest,
  items: items.map((item) => ({
    ...item,
    files: item.files?.map(({ path: filePath, type, target }) => ({ path: filePath, type, target })),
  })),
};

await writeFile(path.join(outputDirectory, "registry.json"), `${JSON.stringify(publicCatalog, null, 2)}\n`);
await writeFile(path.join(outputDirectory, "config.schema.json"), `${JSON.stringify({
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://ui.aramon.ma/r/config.schema.json",
  title: "Aramon UI Project Configuration",
  type: "object",
  additionalProperties: false,
  required: ["registry"],
  properties: {
    $schema: { type: "string" },
    registry: { type: "string", description: "Base URL of the Aramon registry." },
  },
}, null, 2)}\n`);

for (const item of items) {
  const files = await Promise.all((item.files ?? []).map(async (file) => {
    const content = await readFile(path.join(root, file.path), "utf8");
    return { ...file, content: consumerContent(file.path, content) };
  }));
  const payload = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    files,
  };
  await writeFile(path.join(outputDirectory, `${item.name}.json`), `${JSON.stringify(payload, null, 2)}\n`);
}

console.log(`Built ${items.length} registry items in ${path.relative(root, outputDirectory)}.`);
