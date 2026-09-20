# Aramon UI

Aramon UI is a source-owned React, Next.js, and Tailwind CSS design system for Aramon applications and the AI agents that build them.

It is built around four material roles:

- **Desk** creates the quiet environment.
- **Frame** structures stable and repeated information.
- **Medium** provides scarce, earned translucent depth.
- **Lamp** identifies the next meaningful action.

Explore the system at [ui.aramon.ma](https://ui.aramon.ma/) and inspect all components at [ui.aramon.ma/components](https://ui.aramon.ma/components/).

## Requirements

- Node.js 20.9 or newer
- React 19
- Next.js App Router or another React application
- Tailwind CSS 4

Aramon components are copied into your project. Your team owns the installed source and can review, change, or remove it without depending on a runtime UI package.

## Quick start

The CLI is currently repository-run while the first npm release is prepared.

### 1. Build the CLI

```bash
git clone https://github.com/Aramon-IT/Aramon-UI.git
cd Aramon-UI
pnpm install
pnpm --filter ./packages/cli build
```

### 2. Initialize Aramon in an application

Run the CLI from the cloned Aramon UI repository and point `--cwd` to your application:

```bash
node packages/cli/dist/index.js init --cwd ../my-next-app
```

Initialization creates:

```text
aramon.json
styles/aramon.css
docs/aramon/ui-system.md
docs/aramon/medium-animation.md
docs/aramon/Aramon-Medium-Physics.md
```

The Markdown files give developers and AI coding agents the same visual-language and performance rules.

### 3. Add components

Install only what the application needs:

```bash
node packages/cli/dist/index.js add button input select --cwd ../my-next-app
```

Or install the complete current catalog:

```bash
node packages/cli/dist/index.js add aramon-ui --cwd ../my-next-app
```

Registry dependencies are resolved automatically. Existing files are never overwritten unless `--overwrite` is explicitly provided.

### 4. Import the design tokens

Add the generated stylesheet to the application’s global CSS:

```css
@import "tailwindcss";
@import "../styles/aramon.css";
```

Adjust the relative path when the global stylesheet lives in a nested directory such as `app/` or `src/app/`.

### 5. Set the visual field

Apply an Aramon theme to the application root:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-aramon-theme="light">
      <body>{children}</body>
    </html>
  );
}
```

Use `data-aramon-theme="dark"` for the dark field. A theme control should change this attribute without changing component markup.

### 6. Use installed components

Components are installed under `components/aramon` by default:

```tsx
import { Button } from "@/components/aramon/button";
import { FieldLabel, Input } from "@/components/aramon/input";
import { Frame } from "@/components/aramon/frame";

export function SessionForm() {
  return (
    <Frame className="grid gap-5 p-6">
      <FieldLabel>
        Session title
        <Input placeholder="Memory models" />
      </FieldLabel>

      <div className="flex gap-2">
        <Button energy="lamp">Create session</Button>
        <Button energy="quiet">Cancel</Button>
      </div>
    </Frame>
  );
}
```

Use one `lamp` action per viewport. Supporting actions should normally use `reflective` or `quiet` energy.

## Using Aramon Medium

Install the signature focus surface or dialog:

```bash
node packages/cli/dist/index.js add focus-vessel dialog --cwd ../my-next-app
```

The installer also adds the framework-independent physics engine and React adapter.

```tsx
import { Button } from "@/components/aramon/button";
import { FocusVessel } from "@/components/aramon/focus-vessel";

export function FocusSession() {
  return (
    <FocusVessel
      eyebrow="ACTIVE SESSION"
      metric="50:00"
      title="Memory models"
      action={<Button energy="lamp">Begin session</Button>}
    >
      Move inside the vessel to disturb its light. Text and controls remain stable.
    </FocusVessel>
  );
}
```

### Medium performance budget

Live physics is intentionally scarce:

- One persistent live Medium vessel is allowed in a viewport.
- One additional transient vessel may mount for an open dialog or overlay.
- Supporting glass, navigation rails, fields, tables, and repeated cards remain static.
- Closed overlays must not retain a canvas, observer, listener, or animation loop.
- Reduced motion, Save Data, touch, and unavailable Canvas features receive safe fallbacks.

Use `interaction="off"` on `FocusVessel` when a specimen or supporting surface should retain the material without mounting live physics.

## Component catalog

The v1 documentation catalog contains 27 components:

| Responsibility | Components |
| --- | --- |
| Actions and entry | Button, Input, Select, Checkbox, Switch, Radio Card |
| Navigation | Tabs, Breadcrumb, Floating Navbar |
| Feedback | Alert, Badge, Notification Badge, Tooltip, Progress Trace |
| Data | Avatar, Animated List, Table, Empty State, Keyboard Key |
| Surfaces | Frame, Focus Vessel, Dialog, Separator, Skeleton |
| Motion and media | Material Background, Text Morph, Blur Out Up |

Some families contain multiple related primitives, so the public registry currently exposes more installable items than the family count.

## CLI reference

```text
aramon-ui init [--cwd <path>] [--registry <url>]
aramon-ui add <item...> [--overwrite] [--cwd <path>] [--package-manager <name>]
aramon-ui list [--registry <url>]
aramon-ui view <item> [--registry <url>]
```

From the repository build, replace `aramon-ui` with `node packages/cli/dist/index.js`.

Examples:

```bash
node packages/cli/dist/index.js list
node packages/cli/dist/index.js view dialog
node packages/cli/dist/index.js add button table empty-state --cwd ../my-next-app
```

The default public registry is `https://ui.aramon.ma/r`. Each item is also readable directly, for example [button.json](https://ui.aramon.ma/r/button.json).

## AI agent instructions

`aramon-ui init` installs the normative prompt files into `docs/aramon`. Give these files to an AI coding agent before asking it to build an Aramon application.

The prompts define:

- Desk, Frame, Medium, and Lamp role assignment;
- semantic tokens and both-theme behavior;
- component-selection guidance;
- the liquid animation physics contract;
- accessibility and performance review criteria.

## Repository structure

```text
apps/docs             Documentation, component explorer, and registry host
packages/tokens       Semantic CSS and TypeScript design tokens
packages/ui           Canonical React component source
packages/medium       Framework-independent physics and React adapter
packages/prompts      Instructions for developers and AI agents
packages/cli          Independent source installer
registry.json         Public registry manifest
scripts               Registry build tooling
docs                  Aramon Medium Physics specification
```

## Contributing

```bash
pnpm install
pnpm dev
pnpm registry:check
pnpm registry:build
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm e2e
```

Before adding a new component:

1. Define its product responsibility.
2. Assign Desk, Frame, Medium, or Lamp.
3. Prefer native semantics and Server Components.
4. Document light, dark, keyboard, touch, disabled, and reduced-motion behavior.
5. Add its source file to `registry.json`.
6. Verify installation into a clean application directory.

## Release status

Aramon UI v1 is implemented and awaiting product sign-off. The source registry is usable today; npm publication and the `v1.0.0` tag remain separate release actions. Existing consumers should review [MIGRATION.md](./MIGRATION.md) before adopting the v1 token and behavior contract.
