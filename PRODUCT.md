# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Aramon application teams and AI coding agents are the primary users. They use the library while building education and identity experiences and need a dependable visual and behavioral contract rather than isolated examples.

## Product Purpose

Aramon UI is the canonical source of truth for Aramon interface design. It provides installable tokens, React components, patterns, assets, registry items, prompts, and machine-readable documentation. V1 succeeds when an agent given only `ui.aramon.ma` can understand the system, install it into a clean Next.js application, and produce a recognizably consistent Aramon interface.

## Positioning

Aramon UI combines a quiet, operational component foundation with two named brand materials: Lamp for primary action and Medium for rare, earned focus surfaces. Its public documentation and registry are authored for humans and agents from the same typed source.

## Operating Context

The library is consumed by Aramon applications including Classroom, Workspace, Academy, and Identity. Teams browse documentation, copy or install components through a shadcn-compatible registry or the Aramon CLI, and use proof recipes to compose entry and high-interaction product experiences. This iteration changes only Aramon UI; production application migrations are separate follow-up work.

## Capabilities and Constraints

- React 19, Next.js 16 static export, TypeScript, Tailwind CSS 4, GitHub Pages, and a source-owned registry remain the supported platform.
- Light and dark themes, English, French, Arabic, RTL, reduced motion, Save Data, keyboard operation, and responsive layouts are release requirements.
- Public component and token contracts are a clean v1 break; no v0 compatibility aliases are required.
- npm publication, authentication, backend behavior, analytics, and direct application migrations are outside this iteration.
- Desk, Frame, Medium, and Lamp remain canonical Aramon terminology.

## Brand Commitments

- The visual foundation is neutral, typographically restrained, and generous with whitespace.
- Lamp is the only primary action treatment: near-black in light mode and warm ivory in dark mode.
- Medium is a neutral focus vessel with controlled material glint and physics; it is used sparingly.
- Corners use a consistent squircle language. True circles are reserved for avatars, presence, and dot indicators.
- The user-provided iridescent material video is reserved for sparse entry, confirmation, and join-session compositions plus one documentation showcase.
- The material background file at `/Users/nabilmouzouna/School/material-background.mp4` is authorized for redistribution inside Aramon projects.

## Evidence on Hand

- Existing component, token, registry, CLI, prompt, and documentation source in this repository.
- User-provided 1600×1200, 10-second MP4 at `/Users/nabilmouzouna/School/material-background.mp4`.
- Confirmed interaction references for Animated List, Notification Badge, Floating Navbar, Text Morph, Blur Out Up, and Amicro. These are behavioral references, not source or a second design system.
- No customer claims, performance measurements, or adoption statistics may be fabricated.

## Product Principles

1. One source: visual documentation, installable source, registry metadata, and agent guidance must not drift.
2. Quiet by default: ordinary product UI communicates through hierarchy, spacing, and state rather than ambient effects.
3. Material is earned: Lamp and Medium are distinctive because they are used with restraint.
4. Accessible in every locale: theme, direction, motion preference, input method, and content length are first-class contracts.
5. Agent-legible: every public component explains responsibility, states, behavior, installation, and composition without requiring visual scraping.

## Accessibility & Inclusion

The release target is WCAG 2.2 AA with visible focus, 44px touch targets, 200% zoom and reflow, no horizontal overflow, complete keyboard behavior, intact assistive-technology text, reduced-motion fallbacks, and logical properties for RTL. English, French, and Arabic are supported without separate component implementations.
