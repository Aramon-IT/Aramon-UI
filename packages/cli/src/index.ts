#!/usr/bin/env node

const command = process.argv[2] ?? "help";

if (command === "help" || command === "--help" || command === "-h") {
  console.log(`Aramon UI

Usage:
  aramon-ui init
  aramon-ui add <component>
  aramon-ui list

The CLI workspace is initialized. Command implementation is the next milestone.`);
} else {
  console.error(`Unknown command: ${command}`);
  process.exitCode = 1;
}
