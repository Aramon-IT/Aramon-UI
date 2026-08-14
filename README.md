# Aramon-UI

An independent React, Next.js, and Tailwind CSS interface system built around the Aramon Medium Physics language.

## Workspace

- `apps/docs` - desktop-style documentation, component explorer, and static registry host
- `packages/tokens` - semantic CSS and TypeScript design tokens
- `packages/ui` - server-compatible React primitives
- `packages/medium` - client-only liquid material runtime
- `packages/prompts` - UI, token, animation, and review instructions for AI agents
- `packages/cli` - independent `aramon-ui` source installer
- `registry.json` - source-owned public registry catalog
- `scripts/build-registry.mjs` - validated static registry builder

## Commands

```bash
pnpm install
pnpm dev
pnpm registry:check
pnpm registry:build
pnpm typecheck
pnpm build
```

## Registry workflow

Aramon components are copied into the consuming application so its team owns the installed source. Package files remain the canonical implementation; the registry builder creates dependency-aware JSON payloads at `/r/[name].json`.

```bash
aramon-ui init
aramon-ui add button input table
aramon-ui add aramon-ui
```

Until the CLI package is published, it can be compiled and exercised locally with `pnpm --filter ./packages/cli build`.

## Medium budget

Static glass may support a small number of architectural surfaces. Live liquid physics is limited to one persistent signature vessel and one transient overlay. Repeated content, rails, fields, and hidden dialogs remain static.
