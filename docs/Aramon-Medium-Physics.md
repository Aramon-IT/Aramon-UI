---
title: Aramon Medium Physics
version: 1.0.0
status: Approved baseline
date: 2026-08-11
audience:
  - product designers
  - frontend engineers
  - AI coding agents
purpose: Build focused, creative, productive web applications with the Aramon visual language.
---

# Aramon Medium Physics

Aramon Medium Physics is a visual and behavioral language for focused web applications. It is designed to feel like a calm desktop environment rather than a conventional website.

The system is not a collection of fashionable effects. It is a model for assigning responsibility to every layer of an interface:

1. **Desk** creates the environment.
2. **Frame** creates stable architecture.
3. **Medium** acknowledges earned interaction.
4. **Lamp** reveals the next meaningful action.

> One Lamp. One living Medium surface. No liquid in repeated rows. No depth without function.

## 1. Design intent

Aramon applications should make users feel:

- **Focused:** attention is guided without visual pressure.
- **Creative:** the interface feels alive, tactile, and open to exploration.
- **Productive:** structure remains predictable and information-dense work stays easy to scan.
- **Comfortable:** surfaces feel quiet and inhabitable rather than corporate, severe, or overly playful.
- **Distinctive:** the product behaves like its own environment instead of copying dashboard conventions.

The desired character is:

- desktop-like, not webpage-like;
- architectural, not card-based;
- translucent where spatial context matters;
- physical where interaction earns a response;
- restrained enough for long sessions;
- expressive through behavior rather than decoration.

## 2. Normative language

The words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** define implementation requirements.

- **MUST**: required for an interface to represent Aramon correctly.
- **SHOULD**: expected unless a documented product constraint requires an exception.
- **MAY**: optional and context-dependent.

## 3. The four material roles

### 3.1 Desk

**Responsibility:** the environmental plane behind all work.

The Desk establishes atmosphere and provides enough visual variation for translucent surfaces to be perceptible. It stays calm and does not compete with content.

Use Desk for:

- application canvas;
- window background;
- atmospheric imagery;
- negative space;
- global theme.

Rules:

- The Desk MUST remain visually quieter than every interactive surface.
- Background imagery SHOULD be soft, low-frequency, and partially veiled.
- The Desk MUST NOT contain high-contrast detail behind long-form text.
- The Desk MAY use a fixed image or slow static gradient.
- Ambient animation MUST NOT be required to understand or use the product.

### 3.2 Frame

**Responsibility:** stable information architecture.

The Frame groups, aligns, and separates content. It does not pretend to float. Most of an Aramon application should be built from Frame behavior.

Use Frame for:

- navigation;
- panels;
- lists and rows;
- content sections;
- forms and wells;
- tables;
- static cards;
- toolbars.

Rules:

- Frames MUST remain still during normal interaction.
- Frames SHOULD use hairlines, alignment, and spacing before shadow.
- Repeated items MUST use Frame, not Medium.
- Frames MUST NOT receive liquid physics.
- Rounded corners SHOULD be asymmetric: restrained at the structural edge and softer at the resting edge.

### 3.3 Medium

**Responsibility:** earned interactive depth.

Medium is a neutral black translucent liquid contained inside a component-shaped vessel. The vessel stays still; only the internal field responds.

Use Medium for:

- one active focus vessel;
- dialogs and overlays;
- command surfaces;
- contextual tools crossing layers;
- a small number of material choices;
- moments where interaction changes spatial depth.

Rules:

- Medium MUST be neutral black in light mode.
- Mood color MAY appear in the glint, reflected light, or fluid response.
- Medium MUST NOT use large opaque mood-colored fills in light mode.
- Text MUST render above the fluid field and MUST remain undistorted.
- The component is the vessel and MUST NOT wobble, stretch, or follow the pointer.
- Repeated Medium surfaces MUST stay inert until touched.
- Only the most recently interacted surfaces SHOULD consume animation work.
- Medium MUST provide a flat fallback when blur or animation is unavailable.

### 3.4 Lamp

**Responsibility:** identify priority.

Lamp is illumination, not a brand-color button. It marks the next meaningful action and selected states.

Use Lamp for:

- the primary action;
- active progress trace;
- selected checkbox or radio;
- current position indicator;
- one small status light.

Rules:

- A viewport SHOULD contain one dominant Lamp.
- Secondary actions MUST reflect rather than emit.
- Tertiary actions SHOULD appear as language with minimal containment.
- Multiple equally luminous calls to action MUST NOT appear together.
- Lamp color MUST preserve readable dark text.

## 4. Theme model

Theme changes the environment, not the system roles.

### Dark mode

Dark mode is intimate and immersive.

- Desk uses deep neutral black.
- Frame uses dark translucent neutral surfaces.
- Medium may carry a very subtle mood undertone.
- Lamp may be gently warm to feel inhabited.
- Text uses soft mineral white instead of pure white.

### Light mode

Light mode is open, quiet, and desktop-like.

- Desk uses cool pearl and mineral blue.
- Frame uses translucent white.
- Medium remains neutral translucent black.
- Mood colors are confined to glints and fluid energy.
- Lamp uses luminous pearl-blue.
- Text uses blue-black ink.

### Theme invariants

Across both themes:

- semantic roles do not change;
- component hierarchy does not change;
- Medium is always the deepest material;
- Lamp is always the brightest actionable material;
- primary text contrast must meet WCAG AA;
- translucency never replaces legibility.

## 5. Semantic color tokens

### 5.1 Core colors

| Token | Dark | Light | Responsibility |
|---|---:|---:|---|
| \`desk.canvas\` | \`#0D0C0E\` | \`#E9F0EF\` | Calm application plane |
| \`desk.deep\` | \`#080709\` | \`#D8E5E6\` | Browser and overscroll foundation |
| \`frame.surface\` | \`rgba(20,18,21,.66)\` | \`rgba(249,252,251,.66)\` | Stable architecture |
| \`frame.hairline\` | \`rgba(238,234,228,.14)\` | \`rgba(27,56,66,.14)\` | Quiet division |
| \`frame.hairlineStrong\` | \`rgba(238,234,228,.27)\` | \`rgba(27,56,66,.25)\` | Active structural edge |
| \`well.surface\` | \`rgba(1,1,2,.40)\` | \`rgba(39,83,98,.08)\` | Recessed input |
| \`ink.primary\` | \`#EEEAE4\` | \`#18272D\` | Primary content |
| \`ink.secondary\` | \`rgba(238,234,228,.64)\` | \`rgba(24,39,45,.68)\` | Supporting content |
| \`ink.quiet\` | \`rgba(238,234,228,.38)\` | \`rgba(24,39,45,.45)\` | Metadata and indices |
| \`medium.top\` | mood-dependent neutral | \`rgb(24,26,27)\` | Upper liquid density |
| \`medium.bottom\` | mood-dependent neutral | \`rgb(3,4,5)\` | Lower liquid density |
| \`lamp.surfaceTop\` | \`#FFF5E8\` | \`#FFFFFF\` | Primary light source |
| \`lamp.surfaceBottom\` | \`#E8D3B8\` | \`#D2EBF0\` | Primary light body |
| \`lamp.ink\` | \`#211711\` | \`#17313B\` | Text on Lamp |
| \`signal.danger\` | \`#F18B82\` | \`#B9473F\` | Destructive or blocking state |

### 5.2 CSS baseline

\`\`\`css
:root {
  --desk: #0d0c0e;
  --desk-deep: #080709;
  --frame: rgba(20, 18, 21, .66);
  --well: rgba(1, 1, 2, .40);

  --ink: #eeeae4;
  --ink-2: rgba(238, 234, 228, .64);
  --ink-3: rgba(238, 234, 228, .38);

  --hairline: rgba(238, 234, 228, .14);
  --hairline-strong: rgba(238, 234, 228, .27);

  --medium-top: 62, 79, 70;
  --medium-bottom: 13, 21, 18;
  --medium-alpha-top: .50;
  --medium-alpha-bottom: .68;

  --glint: 218, 235, 226;
  --physics-color: 218, 235, 226;
  --medium-shadow: 34, 66, 53;
  --ambient: 82, 132, 107;

  --lamp: #e7f0e8;
  --lamp-warm: #c6d9ca;
  --danger: #f18b82;

  --ease-material: cubic-bezier(.22, 1, .36, 1);
}

[data-theme="light"] {
  --desk: #e9f0ef;
  --desk-deep: #d8e5e6;
  --frame: rgba(249, 252, 251, .66);
  --well: rgba(39, 83, 98, .08);

  --ink: #18272d;
  --ink-2: rgba(24, 39, 45, .68);
  --ink-3: rgba(24, 39, 45, .45);

  --hairline: rgba(27, 56, 66, .14);
  --hairline-strong: rgba(27, 56, 66, .25);

  /* Medium stays neutral black in light mode. */
  --medium-top: 24, 26, 27;
  --medium-bottom: 3, 4, 5;
  --medium-shadow: 13, 20, 22;

  --lamp-surface-top: #ffffff;
  --lamp-surface-bottom: #d2ebf0;
  --lamp-ink: #17313b;
}
\`\`\`

## 6. Mood tokens

Moods change atmosphere and reflected light. They do not replace semantic roles.

| Mood | Intent | Ambient | Glint | Use |
|---|---|---:|---:|---|
| Mist | Restful focus | \`#8FB49A\` | \`#DAEBE2\` | Reading, planning, concentration |
| Iris | Quiet imagination | \`#9B84BA\` | \`#E7DDF7\` | Creation, ideation, studio work |
| Tide | Open technical clarity | \`#6FA7BF\` | \`#D6EBF2\` | Engineering, analysis, building |
| Pearl | Luminous neutrality | \`#B5AA90\` | \`#F4EFE2\` | Archives, review, administration |

Rules:

- Moods MAY affect ambient light, glint, physics color, and very subtle dark-mode undertone.
- Moods MUST NOT change the meaning of primary, warning, success, or destructive actions.
- In light mode, mood color MUST NOT replace neutral black Medium.
- An application SHOULD begin with one default mood and MAY offer deliberate user selection.

## 7. Typography tokens

### Families

\`\`\`css
--font-display: "Iowan Old Style", "Baskerville", "Times New Roman", serif;
--font-ui: "Avenir Next", "Segoe UI", Helvetica, Arial, sans-serif;
--font-mono: "SFMono-Regular", "Cascadia Mono", Consolas, monospace;
\`\`\`

### Scale

| Token | Family | Weight / size / line-height | Tracking | Use |
|---|---|---|---|---|
| \`display.hero\` | Display | \`400 / clamp(72px,10vw,142px) / .78\` | \`-.075em\` | First-view statement |
| \`display.section\` | Display | \`400 / clamp(42px,5vw,68px) / .95\` | \`-.05em\` | Major sections |
| \`display.component\` | Display | \`400 / 34px / 1.1\` | \`-.025em\` | Component concepts |
| \`ui.body\` | UI | \`400 / 16px / 1.7\` | normal | Long readable copy |
| \`ui.control\` | UI | \`500 / 12px / 1\` | \`.01em\` | Controls |
| \`mono.label\` | Mono | \`400 / 10px / 1.2\` | \`.13em\` | Labels, indices, metadata |

Rules:

- Display type SHOULD communicate reflection, meaning, or hierarchy.
- UI type MUST handle tasks, controls, and readable content.
- Mono labels MUST remain short and uppercase.
- Long copy MUST NOT use the display face.
- Hero display size MUST compress responsively rather than clip.

## 8. Spacing, radius, and blur

### Spacing

| Token | Value |
|---|---:|
| \`space.1\` | \`4px\` |
| \`space.2\` | \`8px\` |
| \`space.3\` | \`12px\` |
| \`space.4\` | \`16px\` |
| \`space.6\` | \`24px\` |
| \`space.8\` | \`32px\` |
| \`space.12\` | \`48px\` |
| \`space.16\` | \`64px\` |
| \`space.24\` | \`96px\` |

### Radius

| Token | Value | Use |
|---|---:|---|
| \`radius.edge\` | \`2px\` | Architectural top edge |
| \`radius.control\` | \`6px\` | Buttons and small controls |
| \`radius.frame\` | \`12px\` | Resting edge of Frame |
| \`radius.medium\` | \`18px\` | Medium vessels and overlays |
| \`radius.round\` | \`999px\` | Indicators only |

Preferred frame shape:

\`\`\`css
border-radius: 2px 2px 12px 12px;
\`\`\`

Preferred Medium shape:

\`\`\`css
border-radius: 18px 18px 7px 7px;
\`\`\`

### Blur

| Token | Value | Use |
|---|---:|---|
| \`blur.near\` | \`12px\` | Overlay veil |
| \`blur.chrome\` | \`18px\` | Persistent toolbar |
| \`blur.medium\` | \`24px\` | Living Medium |
| \`blur.deep\` | \`32px\` | Rare deep overlay |

## 9. Material density

Translucency is a relationship between a foreground surface and the environment behind it.

| Level | Top alpha | Bottom alpha | Intended role |
|---|---:|---:|---|
| Frame | \`.66\` surface | n/a | Stable architecture |
| Medium choice | \`.38\` | \`.56\` | Small selectable specimen |
| Medium default | \`.50\` | \`.68\` | General contextual surface |
| Focus vessel | \`.57\` | \`.74\` | Active concentration |
| Dialog | \`.62\` | \`.78\` | Nearest temporary depth |

### Medium recipe

\`\`\`css
.medium {
  position: relative;
  overflow: hidden;
  isolation: isolate;

  background:
    radial-gradient(
      120% 90% at 34% 0%,
      rgba(var(--glint), .12),
      transparent 54%
    ),
    linear-gradient(
      156deg,
      rgba(var(--medium-top), var(--medium-alpha-top)),
      rgba(var(--medium-bottom), var(--medium-alpha-bottom))
    );

  border: 1px solid rgba(var(--glint), .17);
  box-shadow:
    inset 0 1px 0 rgba(var(--glint), .28),
    inset 0 -70px 90px -60px rgba(0, 0, 0, .66),
    0 28px 80px -52px rgba(var(--medium-shadow), .78);

  -webkit-backdrop-filter: blur(24px) saturate(1.45);
  backdrop-filter: blur(24px) saturate(1.45);
}
\`\`\`

### Content layering

\`\`\`css
.medium > .fluid-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.medium > :not(.fluid-layer) {
  position: relative;
  z-index: 2;
}
\`\`\`

Text and controls MUST never be children of the distorted or animated canvas layer.

## 10. Motion tokens

| Token | Value | Use |
|---|---:|---|
| \`motion.instant\` | \`160ms\` | Press feedback |
| \`motion.control\` | \`320ms\` | Hover and selection |
| \`motion.enter\` | \`520ms\` | Overlay and vessel entrance |
| \`motion.measure\` | \`800ms\` | Progress and long state |
| \`ease.material\` | \`cubic-bezier(.22,1,.36,1)\` | Settling without bounce |

Motion sequence:

1. **Intent:** the pointer enters or presses.
2. **Energy:** a local impulse enters the sealed vessel.
3. **Diffusion:** the wave reveals depth and reflected light.
4. **Calm:** energy decays until the surface is still.

Rules:

- Motion MUST be caused by intent.
- Motion MUST decay rather than loop indefinitely.
- Layout MUST NOT bounce.
- Text MUST NOT wobble, stretch, blur, or refract.
- Progress MAY animate over \`800ms\`.
- Button press SHOULD use a small \`scale(.985)\` transformation.
- All interface motion MUST honor \`prefers-reduced-motion\`.

## 11. Liquid physics tokens

| Token | Value | Meaning |
|---|---:|---|
| \`physics.cell\` | \`10px\` | Simulation grid density |
| \`physics.wave\` | \`0.42\` | Wave velocity; MUST remain below approximately \`0.50\` |
| \`physics.velocityDamp\` | \`0.968\` | Viscosity |
| \`physics.heightDamp\` | \`0.984\` | Return to calm |
| \`physics.smooth\` | \`0.14\` | Light diffusion |
| \`physics.smoothPasses\` | \`1\` | Field smoothing |
| \`physics.lightX\` | \`0.55\` | Horizontal light direction |
| \`physics.lightY\` | \`-0.83\` | Vertical light direction |
| \`physics.quiet\` | \`0.02\` | Sleep threshold |
| \`physics.supersample\` | \`2\` | Render resolution multiplier |
| \`physics.blurPasses\` | \`2\` | Optical softness |
| \`physics.gain\` | \`1.5\` | Highlight recovery after blur |

### Performance tiers

| Tier | Behavior |
|---|---|
| Full | Pointer stir and press impulses with full render quality |
| Reduced | Press-only interaction with lower sustained cost |
| Flat | No simulation; retain static translucent material |

An implementation SHOULD select tiers from measured device capabilities, reduced-motion preference, save-data preference, and input modality.

The engine SHOULD:

- drive all pools from one director loop;
- animate no more than a small fixed number of recently touched pools;
- suspend work when the document is hidden;
- reset pools when they leave the viewport;
- avoid reallocating the canvas when grid dimensions have not changed;
- attach after framework hydration;
- expose explicit \`attach\`, \`detach\`, and \`configure\` methods.

## 12. Interaction hierarchy

### Primary action: Lamp

\`\`\`css
.button-primary {
  min-height: 42px;
  padding-inline: 19px;
  border-radius: var(--radius-control);
  color: var(--lamp-ink);
  background: linear-gradient(
    180deg,
    var(--lamp-surface-top),
    var(--lamp-surface-bottom)
  );
  font-weight: 600;
}
\`\`\`

### Secondary action: reflective control

In dark mode, a secondary action MAY use a compact static Medium treatment.

In light mode, it SHOULD use a translucent cool pearl surface instead of a dark colored fill.

\`\`\`css
[data-theme="light"] .button-secondary {
  color: #20363e;
  background: linear-gradient(
    160deg,
    rgba(255,255,255,.72),
    rgba(207,227,232,.54)
  );
  border: 1px solid rgba(48,93,107,.20);
  backdrop-filter: blur(16px) saturate(1.2);
}
\`\`\`

### Tertiary action: language

Tertiary actions SHOULD have:

- transparent background;
- no decorative shadow;
- secondary ink at rest;
- primary ink on hover;
- a visible keyboard focus ring.

## 13. Component specifications

### 13.1 Application shell

An Aramon application shell SHOULD contain:

- a persistent navigation dock;
- a compact workspace bar;
- one content canvas;
- environmental Desk behind all layers;
- user-controlled light and dark theme;
- no generic dashboard card grid in the first viewport.

The shell MUST feel like an application environment, not a marketing page.

### 13.2 Navigation dock

An item contains:

1. index;
2. label;
3. active structural edge.

Rules:

- inactive items use quiet ink;
- the active item uses primary ink;
- the active state MAY borrow a low-energy glint;
- navigation rows MUST remain Frame, never animated Medium;
- mobile navigation MAY move to the bottom edge.

### 13.3 Workspace bar

The workspace bar:

- remains sticky;
- uses Frame translucency and \`blur.chrome\`;
- includes route context, global status, and no more than two actions;
- MUST remain visually quieter than page content.

### 13.4 Frame panel

A Frame panel contains:

- a lintel;
- a title;
- optional action;
- body content;
- one subtle glint line indicating crafted structure.

Frames use hairlines and internal alignment. They SHOULD avoid large shadows.

### 13.5 Data row

A data row MAY contain:

- index;
- time or metadata;
- primary label;
- secondary detail;
- state.

Rules:

- rows use a single shared container;
- current state MAY use a low-energy edge or gradient;
- rows MUST NOT become individual floating cards;
- row hover MUST NOT move surrounding layout.

### 13.6 Input well

Inputs are recesses cut into Frame.

Rules:

- use \`well.surface\`;
- default border remains mostly transparent;
- the top rim MAY be slightly stronger;
- focus reveals the rim with glint;
- labels use \`mono.label\`;
- field text uses primary ink;
- error state MUST include text, not color alone.

### 13.7 Selection control

A selected checkbox or radio borrows a small Lamp.

Rules:

- unchecked state uses a hairline boundary;
- checked state uses Lamp fill and Lamp ink;
- the selected glow MUST remain weaker than the primary action;
- target size MUST be at least \`44px\`, even if the visible mark is smaller.

### 13.8 Tabs

Tabs remain Frame.

Rules:

- use one shared tab rail;
- selected tab changes ink and lower edge;
- selected background MAY use a very low-energy reflective fill;
- tabs MUST NOT become detached pills unless the product context requires compact segmentation.

### 13.9 Focus vessel

A focus vessel is the primary Medium surface for concentrated work.

It may contain:

- context label;
- time or progress measure;
- task title;
- one progress trace;
- one Lamp action.

Rules:

- only one focus vessel SHOULD be active in a viewport;
- the liquid field responds locally;
- text remains stable;
- focus mode MAY dim unrelated architecture but MUST leave a clear exit.

### 13.10 Dialog

A dialog is the nearest Medium depth.

Rules:

- use the densest Medium range;
- include a blurred veil behind it;
- preserve one primary Lamp action;
- support escape, close control, and outside-click behavior where appropriate;
- focus MUST be trapped in production implementations;
- background content MUST be inert while the dialog is open.

### 13.11 Status and progress

Status indicators use small amounts of light.

- Do not use large colored badges for neutral states.
- Use text plus a small lamp or edge.
- Progress traces SHOULD be one-dimensional and quiet.
- Success, warning, and danger remain semantic signals, not mood colors.

## 14. Accessibility floor

Every Aramon interface MUST provide:

- WCAG AA contrast for normal text;
- readable text over the lowest expected background contrast;
- visible keyboard focus;
- logical tab order;
- semantic HTML;
- accessible names for icon-only controls;
- minimum \`44px\` touch targets;
- reduced-motion behavior;
- a non-blur and non-canvas fallback;
- no information encoded by color alone;
- dialog focus management;
- sufficient zoom and responsive reflow.

Translucency MUST be reduced when the background makes content harder to read.

## 15. Responsive behavior

### Desktop

- side dock MAY remain persistent;
- workspace width SHOULD remain bounded;
- large display typography MAY be used;
- multi-column component studies are allowed.

### Tablet

- dock MAY collapse to an icon rail;
- component grids SHOULD reduce to two columns;
- text hierarchy MUST remain unchanged.

### Mobile

- primary navigation SHOULD move to a bottom dock;
- panels become one column;
- large display type MUST scale with \`clamp()\`;
- dense token tables MAY scroll horizontally;
- dialogs use nearly full width with safe edge padding;
- the Lamp action remains reachable without covering content.

## 16. AI-agent generation contract

An AI agent building an Aramon application MUST follow this sequence.

### Step 1: Understand the work

Identify:

- the user's primary job;
- the next meaningful action;
- repeated information structures;
- moments that change spatial depth;
- the expected duration of use;
- accessibility and performance constraints.

### Step 2: Create an attention map

Classify every major area as one of:

- background environment;
- stable architecture;
- earned interactive depth;
- primary priority.

If more than one dominant priority appears in the same viewport, simplify the hierarchy.

### Step 3: Assign material roles

Map:

- environment to Desk;
- repeated and stable content to Frame;
- a small number of spatial or focused interactions to Medium;
- the next meaningful action to Lamp.

Do this before choosing component appearance.

### Step 4: Apply semantic tokens

Use the tokens in this document. Do not paste arbitrary raw colors into component styles.

New tokens MAY be introduced only when:

- the existing semantic set cannot express a required product state;
- the new token has a clear responsibility;
- both dark and light values are defined;
- contrast and interaction behavior are tested.

### Step 5: Build architecture first

Implement:

- shell;
- navigation;
- content alignment;
- Frame hierarchy;
- responsive structure;
- semantic HTML.

Do not add Medium or Lamp until the architecture works without them.

### Step 6: Add material deliberately

For every Medium surface, document:

- why the surface crosses depth;
- its density level;
- its fallback;
- its interaction mode;
- whether it is one of the active physics pools.

For every Lamp, document the action or state it prioritizes.

### Step 7: Verify restraint

Reject the result if it contains:

- glass on every card;
- decorative gradients without roles;
- multiple glowing primary actions;
- animated text;
- wobbling containers;
- opaque mood colors in light-mode Medium;
- generic dashboard card grids;
- shadows used instead of alignment;
- excessive rounded pills;
- repeated liquid animation.

### Step 8: Verify behavior

Test:

- keyboard navigation;
- focus visibility;
- light and dark themes;
- reduced motion;
- flat material fallback;
- responsive layout;
- contrast over actual Desk backgrounds;
- pointer and touch input;
- dialog focus and dismissal;
- physics cleanup after unmount.

## 17. Required implementation output

When asked to build an Aramon application, an AI agent SHOULD provide:

1. a short attention hierarchy;
2. the role assignment for Desk, Frame, Medium, and Lamp;
3. the semantic tokens used;
4. the component inventory;
5. the responsive strategy;
6. the motion and performance tier;
7. the accessibility checks performed;
8. the working implementation.

The agent SHOULD explain exceptions to this specification.

## 18. Acceptance checklist

An implementation is ready when all answers are yes.

### Identity

- [ ] Does the interface feel like a focused desktop environment rather than a normal website?
- [ ] Is the design recognizable without depending on a logo?
- [ ] Does interaction behavior carry more identity than decoration?

### Hierarchy

- [ ] Is there one obvious next meaningful action?
- [ ] Are repeated items built from Frame rather than floating cards?
- [ ] Is every Medium surface functionally justified?

### Theme

- [ ] Does light mode use neutral black Medium?
- [ ] Are mood colors confined to atmosphere and glint in light mode?
- [ ] Do both themes preserve the same hierarchy?

### Material

- [ ] Is translucency visible against the actual Desk?
- [ ] Is text rendered above and outside fluid distortion?
- [ ] Does motion return to calm?
- [ ] Is a flat fallback available?

### Components

- [ ] Do primary, secondary, and tertiary actions have distinct energy?
- [ ] Do fields feel recessed rather than floating?
- [ ] Do selected states borrow less light than the primary action?
- [ ] Are rows quiet and structurally aligned?

### Accessibility and performance

- [ ] Does normal text meet WCAG AA contrast?
- [ ] Are keyboard and touch interactions complete?
- [ ] Is reduced motion respected?
- [ ] Is active simulation cost bounded?
- [ ] Are hidden and unmounted surfaces cleaned up?

## 19. Reference implementation

The living visual reference is available at:

\`https://aramon-focus-study.fuzzy-drake-6580.chatgpt.site/system\`

The source implementation includes:

- the approved dark and light themes;
- neutral black light-mode Medium;
- complete token specimens;
- material density examples;
- component studies;
- print-oriented layout;
- the sealed liquid physics engine.

---

**Aramon Medium Physics 1.0.0**  
Approved baseline - 11 August 2026

