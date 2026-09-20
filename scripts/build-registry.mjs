import { createHash } from "node:crypto";
import { access, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "registry.json");
const outputDirectory = path.join(root, "apps/docs/public/r");
const checkOnly = process.argv.includes("--check");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const items = manifest.items ?? [];
const itemNames = new Set(items.map((item) => item.name));
const registryBase = `${manifest.homepage.replace(/\/$/, "")}/r`;
const itemTypes = new Set(["registry:lib", "registry:block", "registry:component", "registry:ui", "registry:hook", "registry:theme", "registry:page", "registry:file", "registry:style", "registry:base", "registry:font", "registry:item"]);

if (itemNames.size !== items.length) throw new Error("Registry item names must be unique.");

function consumerContent(sourcePath, content) {
  if (sourcePath.endsWith("focus-vessel.tsx") || sourcePath.endsWith("dialog.tsx")) {
    return content
      .replace('from "@aramon/medium/react"', 'from "./medium/react"')
      .replace('from "@aramon/medium"', 'from "./medium/core"');
  }
  if (sourcePath.endsWith("identity-proof.tsx")) {
    return content
      .replace('from "@aramon/ui/button"', 'from "../button"')
      .replace('from "@aramon/ui/input"', 'from "../input"')
      .replace('from "@aramon/ui/material-background"', 'from "../material-background"');
  }
  if (sourcePath.endsWith("classroom-proof.tsx")) {
    return content
      .replace('from "@aramon/ui/animated-list"', 'from "../animated-list"')
      .replace('from "@aramon/ui/button"', 'from "../button"')
      .replace('from "@aramon/ui/floating-navbar"', 'from "../floating-navbar"')
      .replace('from "@aramon/ui/notification-badge"', 'from "../notification-badge"');
  }
  return content;
}

function publicDependencies(item) {
  return (item.registryDependencies ?? []).map((dependency) => `${registryBase}/${dependency}.json`);
}

for (const item of items) {
  if (!itemTypes.has(item.type)) throw new Error(`${item.name} has unsupported registry type ${item.type}.`);
  for (const dependency of item.registryDependencies ?? []) {
    if (!itemNames.has(dependency)) throw new Error(`${item.name} references missing registry dependency ${dependency}.`);
  }
  for (const file of item.files ?? []) {
    const sourcePath = path.resolve(root, file.path);
    if (!sourcePath.startsWith(`${root}${path.sep}`)) throw new Error(`Registry source escapes the repository: ${file.path}`);
    await access(sourcePath);
    if (!file.target?.startsWith("~/")) throw new Error(`Registry target must begin with ~/: ${item.name}/${file.path}`);
  }
  for (const asset of item.assets ?? []) {
    const sourcePath = path.resolve(root, asset.path);
    if (!sourcePath.startsWith(`${root}${path.sep}`)) throw new Error(`Registry asset escapes the repository: ${asset.path}`);
    if (!asset.target?.startsWith("~/")) throw new Error(`Registry asset target must begin with ~/: ${item.name}/${asset.path}`);
    const content = await readFile(sourcePath);
    const digest = createHash("sha256").update(content).digest("hex");
    if (digest !== asset.sha256) throw new Error(`Checksum mismatch for ${asset.path}: expected ${asset.sha256}, received ${digest}.`);
  }
}

if (!checkOnly) await mkdir(outputDirectory, { recursive: true });
const schema = checkOnly ? await fetch("https://ui.shadcn.com/schema/registry-item.json").then((response) => {
  if (!response.ok) throw new Error(`Unable to load shadcn registry schema (${response.status}).`);
  return response.json();
}) : null;
const validateItem = schema ? new Ajv({ allErrors: true, strict: false, validateSchema: false }).compile(schema) : null;

const publicCatalog = {
  ...manifest,
  items: items.map((item) => ({
    ...item,
    registryDependencies: publicDependencies(item),
    files: item.files?.map(({ path: filePath, type, target }) => ({ path: filePath, type, target })),
    assets: undefined,
  })),
};

if (!checkOnly) await writeFile(path.join(outputDirectory, "registry.json"), `${JSON.stringify(publicCatalog, null, 2)}\n`);
if (!checkOnly) await writeFile(path.join(outputDirectory, "config.schema.json"), `${JSON.stringify({
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
if (!checkOnly) await writeFile(path.join(outputDirectory, "namespace.json"), `${JSON.stringify({
  $schema: "https://ui.shadcn.com/schema.json",
  registries: { "@aramon": `${registryBase}/{name}.json` },
}, null, 2)}\n`);

for (const item of items) {
  const files = await Promise.all((item.files ?? []).map(async (file) => {
    const content = await readFile(path.join(root, file.path), "utf8");
    return { ...file, content: consumerContent(file.path, content) };
  }));
  const assets = await Promise.all((item.assets ?? []).map(async (asset) => ({
    url: `${manifest.homepage.replace(/\/$/, "")}/${asset.path.replace(/^apps\/docs\/public\//, "")}`,
    target: asset.target,
    mimeType: asset.mimeType,
    sha256: asset.sha256,
    bytes: (await stat(path.join(root, asset.path))).size,
  })));
  const { assets: _assets, ...publicItem } = item;
  const payload = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...publicItem,
    registryDependencies: publicDependencies(item),
    files,
    ...(assets.length ? { meta: { ...(item.meta ?? {}), aramonAssets: assets } } : {}),
  };
  if (validateItem && !validateItem(payload)) throw new Error(`${item.name} failed shadcn registry-item schema validation:\n${JSON.stringify(validateItem.errors, null, 2)}`);
  if (!checkOnly) await writeFile(path.join(outputDirectory, `${item.name}.json`), `${JSON.stringify(payload, null, 2)}\n`);
}

console.log(checkOnly ? `Registry valid against shadcn/schema: ${items.length} items.` : `Built ${items.length} registry items in ${path.relative(root, outputDirectory)}.`);
