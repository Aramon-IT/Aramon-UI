# Aramon UI v0 → v1

Aramon UI v1 is a clean visual and behavioral break. There are no compatibility aliases.

## Theme

- Put `data-aramon-theme="light"` or `data-aramon-theme="dark"` on the application root. Light is the default.
- Remove product-local primary palettes from shared UI. Lamp is the only primary action treatment.
- Replace legacy glass and glow overrides with Desk, Frame, Medium, divider, and control tokens from `styles/aramon.css`.

## Typography and shape

- Remove serif display declarations. V1 uses the locale-aware system sans stack.
- Replace component-specific corner values with `--aramon-radius-control`, `--aramon-radius-surface`, or `--aramon-radius-feature`.
- Do not use pills for ordinary controls or badges. Circles are reserved for avatars, presence, and true dot indicators.

## Components

- `Button` accepts `loading`; it disables activation and exposes `aria-busy`.
- Native wrappers now accept React 19 `ref` props and forward native attributes and events.
- Fields expose invalid state through native `aria-invalid` and documented error copy.
- Tooltip, Dialog, Tabs, selection controls, alerts, avatars, and tables now follow the v1 focus, keyboard, dismissal, and RTL contracts.
- Text motion is opt-in. Do not use `TextMorph` or `BlurOutUp` for form labels, tables, or repeated navigation.

## Installation

Install a text-only component directly from the public registry:

```sh
pnpm dlx shadcn@latest add https://ui.aramon.ma/r/button.json
```

The Aramon CLI is repository-run until its first npm publication. Build `packages/cli`, then run `node packages/cli/dist/index.js add aramon-ui --cwd /path/to/app` when installing the full catalog and verified material assets. Review conflicts before using `--overwrite`.
