#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_REGISTRY = "https://ui.aramon.ma/r";
const CONFIG_FILE = "aramon.json";

interface RegistryFile {
  path: string;
  type: string;
  target?: string;
  content?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  registryDependencies?: string[];
  dependencies?: string[];
  devDependencies?: string[];
  files?: RegistryFile[];
  meta?: {
    aramonAssets?: RegistryAsset[];
    [key: string]: unknown;
  };
}

interface RegistryAsset {
  url: string;
  target: string;
  mimeType: string;
  sha256: string;
  bytes: number;
}

interface RegistryCatalog {
  name: string;
  homepage?: string;
  items: RegistryItem[];
}

interface CliOptions {
  cwd: string;
  overwrite: boolean;
  registry?: string;
  packageManager?: "pnpm" | "npm" | "yarn" | "bun";
}

function help() {
  console.log(`Aramon UI

Usage:
  aramon-ui init [--cwd <path>] [--registry <url>]
  aramon-ui add <item...> [--overwrite] [--cwd <path>] [--package-manager <name>]
  aramon-ui list [--registry <url>]
  aramon-ui view <item> [--registry <url>]

Examples:
  aramon-ui init
  aramon-ui add button input dialog
  aramon-ui add aramon-ui

Installed source belongs to your application. Live Medium remains limited to
one persistent signature vessel plus one transient overlay.`);
}

function parseArguments(argv: string[]) {
  const positionals: string[] = [];
  const options: CliOptions = { cwd: process.cwd(), overwrite: false };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--overwrite") {
      options.overwrite = true;
    } else if (argument === "--cwd") {
      const value = argv[index + 1];
      if (!value) throw new Error("--cwd requires a path.");
      options.cwd = path.resolve(value);
      index += 1;
    } else if (argument === "--registry") {
      const value = argv[index + 1];
      if (!value) throw new Error("--registry requires a URL.");
      options.registry = value.replace(/\/$/, "");
      index += 1;
    } else if (argument === "--package-manager") {
      const value = argv[index + 1];
      if (!value || !["pnpm", "npm", "yarn", "bun"].includes(value)) throw new Error("--package-manager requires pnpm, npm, yarn, or bun.");
      options.packageManager = value as CliOptions["packageManager"];
      index += 1;
    } else if (argument?.startsWith("-")) {
      throw new Error(`Unknown option: ${argument}`);
    } else if (argument) {
      positionals.push(argument);
    }
  }

  return { options, positionals };
}

async function exists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readConfig(cwd: string) {
  const configPath = path.join(cwd, CONFIG_FILE);
  if (!await exists(configPath)) return null;
  return JSON.parse(await readFile(configPath, "utf8")) as { registry?: string };
}

async function registryBase(options: CliOptions) {
  const config = await readConfig(options.cwd);
  return options.registry ?? process.env.ARAMON_REGISTRY_URL ?? config?.registry ?? DEFAULT_REGISTRY;
}

async function readJson<T>(address: string): Promise<T> {
  if (address.startsWith("file:")) {
    return JSON.parse(await readFile(new URL(address), "utf8")) as T;
  }
  const response = await fetch(address, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`Registry request failed (${response.status}): ${address}`);
  return await response.json() as T;
}

async function readBinary(address: string) {
  if (address.startsWith("file:")) return new Uint8Array(await readFile(new URL(address)));
  const response = await fetch(address);
  if (!response.ok) throw new Error(`Asset request failed (${response.status}): ${address}`);
  return new Uint8Array(await response.arrayBuffer());
}

function registryAddress(base: string, fileName: string) {
  if (base.startsWith("file:")) return new URL(fileName, `${base.replace(/\/$/, "")}/`).href;
  return `${base.replace(/\/$/, "")}/${fileName}`;
}

function localRegistryReference(base: string, address: string) {
  if (!base.startsWith("file:") || !address.startsWith("https://ui.aramon.ma/")) return address;
  const publicUrl = new URL(address);
  if (publicUrl.pathname.startsWith("/r/")) return registryAddress(base, publicUrl.pathname.slice(3));
  return new URL(`../${publicUrl.pathname.replace(/^\//, "")}`, `${base.replace(/\/$/, "")}/`).href;
}

async function fetchItem(base: string, name: string) {
  const requestedAddress = /^(https?|file):/.test(name) ? name : registryAddress(base, `${encodeURIComponent(name)}.json`);
  const address = localRegistryReference(base, requestedAddress);
  return readJson<RegistryItem>(address);
}

async function resolveItems(base: string, requested: string[]) {
  const promises = new Map<string, Promise<RegistryItem>>();
  const resolved = new Map<string, RegistryItem>();

  const load = (name: string) => {
    const current = promises.get(name);
    if (current) return current;
    const pending = fetchItem(base, name);
    promises.set(name, pending);
    return pending;
  };

  async function visit(name: string, ancestry: string[] = []): Promise<void> {
    if ([...resolved.values()].some((item) => item.name === name) || resolved.has(name)) return;
    if (ancestry.includes(name)) throw new Error(`Circular registry dependency detected: ${[...ancestry, name].join(" -> ")}.`);
    const item = await load(name);
    if (resolved.has(item.name)) return;
    for (const dependency of item.registryDependencies ?? []) await visit(dependency, [...ancestry, name]);
    resolved.set(item.name, item);
  }

  for (const name of requested) await visit(name);
  return [...resolved.values()];
}

async function detectPackageManager(cwd: string, selected?: CliOptions["packageManager"]) {
  if (selected) return selected;
  const candidates = [["pnpm-lock.yaml", "pnpm"], ["bun.lock", "bun"], ["bun.lockb", "bun"], ["yarn.lock", "yarn"], ["package-lock.json", "npm"]] as const;
  for (const [file, manager] of candidates) if (await exists(path.join(cwd, file))) return manager;
  return "npm" as const;
}

async function installPackages(cwd: string, packages: string[], packageManager: CliOptions["packageManager"]) {
  if (!packages.length || !packageManager) return;
  const args = packageManager === "npm" ? ["install", ...packages] : ["add", ...packages];
  console.log(`Installing ${packages.length} package${packages.length === 1 ? "" : "s"} with ${packageManager}…`);
  await new Promise<void>((resolve, reject) => {
    const child = spawn(packageManager, args, { cwd, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`${packageManager} ${args[0]} failed with exit code ${code}.`)));
  });
}

async function installItems(base: string, names: string[], options: CliOptions) {
  const items = await resolveItems(base, names);
  const writes = new Map<string, string | Uint8Array>();
  const packageDependencies = new Set<string>();

  for (const item of items) {
    for (const dependency of item.dependencies ?? []) packageDependencies.add(dependency);
    for (const file of item.files ?? []) {
      if (!file.target?.startsWith("~/") || file.content === undefined) {
        throw new Error(`Registry item ${item.name} contains an invalid install file.`);
      }
      const destination = path.resolve(options.cwd, file.target.slice(2));
      if (!destination.startsWith(`${options.cwd}${path.sep}`)) throw new Error(`Registry target escapes the project: ${file.target}`);
      const previous = writes.get(destination);
      if (previous !== undefined && previous !== file.content) throw new Error(`Registry items disagree on ${file.target}.`);
      writes.set(destination, file.content);
    }
    for (const asset of item.meta?.aramonAssets ?? []) {
      if (!asset.target.startsWith("~/")) throw new Error(`Registry item ${item.name} contains an invalid asset target.`);
      const destination = path.resolve(options.cwd, asset.target.slice(2));
      if (!destination.startsWith(`${options.cwd}${path.sep}`)) throw new Error(`Registry asset target escapes the project: ${asset.target}`);
      const content = await readBinary(localRegistryReference(base, asset.url));
      if (content.byteLength !== asset.bytes) throw new Error(`Asset size mismatch for ${asset.url}.`);
      const digest = createHash("sha256").update(content).digest("hex");
      if (digest !== asset.sha256) throw new Error(`Asset checksum mismatch for ${asset.url}.`);
      writes.set(destination, content);
    }
  }

  const conflicts: string[] = [];
  if (!options.overwrite) {
    for (const destination of writes.keys()) {
      if (await exists(destination)) conflicts.push(path.relative(options.cwd, destination));
    }
  }
  if (conflicts.length) throw new Error(`Refusing to overwrite existing files:\n${conflicts.map((file) => `  - ${file}`).join("\n")}\nRun again with --overwrite after reviewing them.`);

  const packageManager = await detectPackageManager(options.cwd, options.packageManager);
  await installPackages(options.cwd, [...packageDependencies].sort(), packageManager);

  for (const [destination, content] of writes) {
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, content);
  }

  console.log(`Installed ${items.length} registry items, ${writes.size} files, and ${packageDependencies.size} package dependencies.`);
  for (const destination of writes.keys()) console.log(`  + ${path.relative(options.cwd, destination)}`);
  if (items.some((item) => item.name === "aramon-base")) {
    console.log("\nImport styles/aramon.css from your global stylesheet, then set data-aramon-theme on the application root.");
  }
}

async function initialize(base: string, options: CliOptions) {
  const configPath = path.join(options.cwd, CONFIG_FILE);
  if (!await exists(configPath)) {
    await writeFile(configPath, `${JSON.stringify({ $schema: "https://ui.aramon.ma/r/config.schema.json", registry: base }, null, 2)}\n`);
    console.log(`Created ${CONFIG_FILE}.`);
  }
  await installItems(base, ["aramon-base", "agent-prompts"], options);
}

async function main() {
  const [command = "help", ...rest] = process.argv.slice(2);
  const { options, positionals } = parseArguments(rest);

  if (["help", "--help", "-h"].includes(command)) return help();

  const base = await registryBase(options);
  if (command === "list") {
    const catalog = await readJson<RegistryCatalog>(registryAddress(base, "registry.json"));
    console.log(`${catalog.name} · ${catalog.items.length} items\n`);
    for (const item of catalog.items) console.log(`${item.name.padEnd(20)} ${item.description ?? item.type}`);
    return;
  }
  if (command === "view") {
    const name = positionals[0];
    if (!name) throw new Error("view requires an item name.");
    const item = await fetchItem(base, name);
    console.log(`${item.title ?? item.name}\n${item.description ?? ""}\n\nDependencies: ${(item.registryDependencies ?? []).join(", ") || "none"}`);
    for (const file of item.files ?? []) console.log(`  ${file.target ?? file.path}`);
    return;
  }
  if (command === "add") {
    if (!positionals.length) throw new Error("add requires at least one item name.");
    await installItems(base, positionals, options);
    return;
  }
  if (command === "init") {
    await initialize(base, options);
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
