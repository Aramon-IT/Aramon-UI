---
name: Aramon UI
description: A quiet, agent-first interface system with earned material light.
colors:
  lamp-light: "#1d1d1f"
  lamp-dark: "#f5efe5"
  desk-light: "#ffffff"
  desk-subtle: "#f5f5f7"
  desk-dark: "#09090b"
  frame-light: "#ffffff"
  frame-dark: "#161617"
  ink-light: "#1d1d1f"
  ink-secondary-light: "#515154"
  ink-tertiary-light: "#6e6e73"
  ink-dark: "#f5f5f7"
  ink-secondary-dark: "#a1a1a6"
  divider-light: "#d2d2d7"
  divider-dark: "#38383a"
  success: "#267a4b"
  attention: "#8a5a00"
  critical: "#b42318"
  signal: "#245c8a"
typography:
  micro:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.5rem–0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0"
  utility:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem–0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0"
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3.5rem, 7vw, 5rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0"
rounded:
  compact: "8px"
  control: "12px"
  surface: "20px"
  feature: "28px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
  12: "48px"
  16: "64px"
components:
  button-primary:
    backgroundColor: "{colors.lamp-light}"
    textColor: "{colors.desk-light}"
    rounded: "{rounded.control}"
    padding: "12px 18px"
    height: "44px"
  input:
    backgroundColor: "{colors.frame-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "44px"
  frame:
    backgroundColor: "{colors.frame-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.surface}"
    padding: "24px"
---

# Design System: Aramon UI

## Overview

**Creative North Star: "The Precision Light Table"**

Aramon UI feels like a calibrated technical field guide laid on a near-white light table. Information is quiet, exact, and generous; structural rules, type, and whitespace do most of the work. Squircle samples and real interactive states make the system tangible without turning documentation into a gallery of effects.

Material light is the rare specimen under examination. Lamp marks decisive action. Medium and the supplied iridescent film appear only where focus or entry has been earned. The old dark-glass desktop, asymmetric corners, decorative glows, and serif display voice are anti-references.

**Key Characteristics:**
- Light-first neutral fields with complete dark parity.
- One sans-serif voice across interface and documentation.
- A 4px spatial rhythm and consistent squircle hierarchy.
- State is communicated through form, contrast, copy, and motion—not color alone.
- One memorable material moment per composition, at most.

## Colors

The palette is cool-neutral and materially quiet. Lamp reverses the page’s dominant ink and ground; semantic colors remain functional and sparse.

### Primary
- **Lamp Ink** (#1d1d1f): Primary action fill in light mode and canonical high-contrast ink.
- **Lamp Ivory** (#f5efe5): Primary action fill in dark mode; warm enough to feel illuminated without becoming beige decoration.

### Neutral
- **Clear Desk** (#ffffff): Main light canvas and raised Frame.
- **Quiet Desk** (#f5f5f7): Grouped light field.
- **Night Desk** (#09090b): Main dark canvas.
- **Night Frame** (#161617): Raised dark surface.
- **Primary Ink** (#1d1d1f / #f5f5f7): High-emphasis text by theme.
- **Secondary Ink** (#515154 / #a1a1a6): Supporting text.
- **Tertiary Ink** (#6e6e73 / #8e8e93): Compact metadata; both theme values retain AA text contrast on their intended surfaces.
- **Divider** (#d2d2d7 / #38383a): Structural separation.

### Named Rules

**The Lamp Rule.** Lamp is the only primary action treatment; shared UI has no canonical blue or maroon action color.

**The Material Budget Rule.** A composition receives at most one persistent Medium or material-video region. Ordinary surfaces remain flat and neutral.

## Typography

**Display Font:** locale-aware system sans (`-apple-system`, `BlinkMacSystemFont`, `SF Pro Display`, `Segoe UI`, `Helvetica Neue`, Arial, sans-serif)
**Body Font:** locale-aware system sans (`-apple-system`, `BlinkMacSystemFont`, `SF Pro Text`, `Segoe UI`, `Helvetica Neue`, Arial, sans-serif)
**Label/Mono Font:** `SFMono-Regular`, `Cascadia Mono`, Consolas, monospace for code only

**Character:** The same calm sans voice carries marketing, documentation, and product UI. Hierarchy comes from scale, weight, and space rather than a display-family change.

### Hierarchy
- **Display** (600, 56–80px, 0.98): Documentation and marketing only.
- **Headline** (600, 32–56px, 1.04): Major section introductions.
- **Title** (600, 20px, 1.2): Component and surface titles.
- **Body** (400, 16px, 1.5): Product copy, kept within 68ch.
- **Label** (600, 13px, 1.25): Controls and compact metadata; sentence case.
- **Utility** (400–600, 12–15px, 1.4): Documentation navigation, API tables, and dense support text.
- **Micro** (400–600, 8–11px, 1.4): Timestamps, counters, and code metadata only; never primary reading text.

### Named Rules

**The Product Scale Rule.** Product screens stop at the headline scale; 56–80px display type belongs only to documentation and marketing contexts.

## Layout

All spacing lands on a 4px grid. Documentation uses a restrained navigation rail and a fluid content canvas capped at 1440px; prose caps at 68ch. Major sections use 64–112px vertical intervals, while component anatomy uses 16–32px intervals. At compact widths the rail becomes a 56px top bar with a 44px-minimum menu control and a full-width, scrollable documentation panel; previews go edge-aligned, and Floating Navbar becomes full width. Logical properties define all alignment and spacing so RTL changes direction without changing components.

## Localization & Direction

The public documentation shell and homepage are localized in English, French, and Arabic. Locale changes set the document language and direction; Arabic uses RTL without a parallel component implementation. Language-of-parts remains explicit: localized regions inherit the selected locale, while untranslated technical pages, code, commands, names, and English-only specimens declare their own `lang` and, where required, `dir="ltr"`. A locale switch must never imply that untranslated content has been translated.

## Motion

Motion is bounded by purpose: 120ms for immediate feedback, 200ms for controls, 420ms for entrances, and 700ms only for material or Medium moments. Ordinary interface motion returns to rest, never loops ambiently, and honors Reduced Motion; material video also yields to Save Data.

## Elevation & Depth

The system is flat by default. Tonal contrast and hairline dividers define layers; shadows appear only for top-layer dialogs, floating navigation, and active drag or lift states. Medium carries internal depth but does not cast a decorative glow into surrounding UI.

### Shadow Vocabulary
- **Floating** (`0 12px 40px rgb(0 0 0 / 0.12)`): Floating Navbar and transient elevated controls.
- **Top Layer** (`0 24px 80px rgb(0 0 0 / 0.24)`): Dialogs only.

**The Flat-by-Default Rule.** Resting controls and Frames do not need a shadow to announce themselves.

## Shapes

Controls use a 12px squircle fallback, nested compact indicators use 8px, Frames use 20px, and feature or Medium surfaces use 28px. `corner-shape: squircle` progressively improves these silhouettes where supported. Avatars, presence, and true dot indicators may be circular; buttons, badges, navigation indicators, and cards are not pills.

## Components

### Buttons
- **Shape:** 12px squircle, at least 44px high.
- **Primary:** Lamp fill with theme-reversed text and restrained internal highlight.
- **Hover / Focus:** Contrast shifts on the 200ms control duration; focus uses a 2px outer ring; active compresses to 0.98 scale.
- **Secondary / Quiet / Critical:** Neutral Frame, unfilled text, and semantic critical treatment respectively.

### Cards / Containers
- **Corner Style:** 20px squircle.
- **Background:** Flat Frame on Desk.
- **Shadow Strategy:** None at rest.
- **Border:** One quiet divider only when background separation is insufficient.
- **Internal Padding:** 20–32px.

### Inputs / Fields
- **Style:** 44px minimum height, 12px squircle, flat Frame fill, quiet divider.
- **Focus:** Strong ink-colored focus ring with no glow.
- **Error / Disabled:** Explicit inline error and `aria-invalid`; disabled retains legible content at reduced contrast.

### Navigation

Navigation is sentence case and low-contrast at rest. Active state uses stronger ink, a local Frame fill, and `aria-current`; mobile navigation exposes a full-width, reachable control rather than a floating pill.

### Medium

Medium is a neutral near-black focus vessel with subtle glint and longer material motion. It is reserved for dialogs, a single persistent focus surface, or sparse entry moments.

### Material Background

The user-provided video renders poster-first, cover-fitted, muted, and inline. Reduced Motion or Save Data receives the poster with no autoplay. A configurable scrim must keep foreground contrast valid.

## Do's and Don'ts

### Do:
- **Do** let whitespace, type, and dividers carry ordinary hierarchy.
- **Do** use logical properties and verify English, French, Arabic, and RTL content extremes.
- **Do** reserve longer motion for Medium and cap normal feedback at 420ms.
- **Do** show complete loading, invalid, empty, disabled, keyboard, and reduced-motion states.

### Don't:
- **Don't** reintroduce serif display type, pill controls, asymmetric radii, broad glassmorphism, or decorative glows.
- **Don't** use the material video on dense product screens.
- **Don't** animate ordinary labels, forms, tables, or repeated navigation text.
- **Don't** use color as the only state signal.
