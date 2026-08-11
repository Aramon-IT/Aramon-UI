# Aramon-UI

An independent React, Next.js, and Tailwind CSS interface system built around the Aramon Medium Physics language.

## Workspace

- `apps/docs` - documentation, component explorer, and future registry host
- `packages/tokens` - semantic CSS and TypeScript design tokens
- `packages/ui` - server-compatible React primitives
- `packages/medium` - client-only liquid material runtime
- `packages/prompts` - UI, token, animation, and review instructions for AI agents
- `packages/cli` - future `aramon-ui` installer
- `registry` - Aramon-owned component catalog

## Commands

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
```

The project intentionally starts with pnpm workspaces only. Build orchestration and publishing automation will be added when the packages require them.
