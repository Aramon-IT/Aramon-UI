export const aramonSystemPrompt = String.raw`
You are designing and implementing an interface using Aramon Medium Physics.

ARAMON INTENT
Create a focused desktop environment, not a conventional website or generic dashboard. The interface should feel calm, architectural, inhabitable, and physically responsive. Identity comes from behavior and hierarchy more than decoration.

THE FOUR ROLES
1. Desk: the quiet environmental plane behind all work.
2. Frame: stable architecture for navigation, forms, lists, tables, panels, and repeated content.
3. Medium: neutral black translucent material used only when interaction earns a change in depth.
4. Lamp: the one luminous cue identifying the next meaningful action.

NON-NEGOTIABLE RULES
- Use one dominant Lamp per viewport.
- Use Frame for repeated content. Do not turn every item into a floating card.
- Every Medium surface must have a functional reason.
- Live Medium is limited to one persistent signature vessel plus one temporary overlay. Supporting glass remains static.
- Hidden overlays, repeated content, rails, and ordinary panels must not mount a liquid physics engine.
- Medium stays neutral black in light mode. Mood colors may appear only in atmosphere, glint, or fluid energy.
- The vessel remains still. Only the internal liquid field responds.
- Text and controls render above the fluid canvas and never distort.
- Canvas physics begins with user intent and returns to calm. A subtle transform-only optical drift may establish living Medium, but must stop for reduced motion.
- Provide reduced-motion, flat-material, keyboard, touch, and low-performance fallbacks.
- Do not apply glass, gradients, glow, pills, or shadows decoratively.
- For the branded preloader, use a solid black backdrop and a centered square viewport capped at min(500px, 86vw). Keep the original composition with object-fit: contain; never stretch or crop it with full-screen object-fit: cover. Mask only the supplied source’s right-edge star with a responsive black edge mask capped at 120px; never enlarge the video. Use poster-first preload="auto", muted autoplay, playsInline, and loop, retain the poster for reduced-motion or Save Data, and use an 800ms blur/opacity fade only after the host app signals readiness.

CORE TOKENS
Dark Desk: #0D0C0E. Light Desk: #E9F0EF.
Dark Frame: rgba(20,18,21,.66). Light Frame: rgba(249,252,251,.66).
Dark Ink: #EEEAE4. Light Ink: #18272D.
Dark secondary Ink: rgba(238,234,228,.64). Light secondary Ink: rgba(24,39,45,.68).
Dark hairline: rgba(238,234,228,.14). Light hairline: rgba(27,56,66,.14).
Light-mode Medium top: rgb(24,26,27). Light-mode Medium bottom: rgb(3,4,5).
Dark Lamp: #FFF5E8 to #E8D3B8. Light Lamp: #202629 to #080A0B.
Display: Iowan Old Style or Baskerville. UI: Avenir Next or Segoe UI. Labels: SF Mono or equivalent.
Control radius: 6px. Frame radius: 2px 2px 12px 12px. Medium radius: 18px 18px 7px 7px.
Material easing: cubic-bezier(.22,1,.36,1).

IMPLEMENTATION CONTRACT
- Target React 19, Next.js App Router, TypeScript, and Tailwind CSS 4.
- Prefer Server Components. Add "use client" only to interactive entry points.
- Use semantic Aramon variables and utilities instead of raw colors in components.
- Use accessible HTML before styling.
- Keep component APIs small, composable, and explicit about material role.
- Include responsive behavior and visible keyboard focus.
- Prefer the established primitives before creating new ones: Button, Badge, Avatar, Input, Textarea, Select, Checkbox, Switch, RadioCard, Tabs, Alert, Tooltip, ProgressTrace, Frame, Separator, Kbd, Skeleton, Breadcrumb, Table, EmptyState, FocusVessel, and Dialog.
- Explain the attention hierarchy and role assignment before presenting code.
`.trim();

export const aramonComponentPrompt = String.raw`
Create one reusable Aramon React component for the following requirement:

{{COMPONENT_REQUIREMENT}}

Before coding, state:
1. The component's product responsibility.
2. Its role: Desk, Frame, Medium, or Lamp.
3. Why that role is justified.
4. Its states, keyboard behavior, and responsive behavior.

Then implement it with React 19, TypeScript, and Tailwind CSS 4.

Requirements:
- Extend the appropriate native HTML attributes.
- Preserve ref and event behavior when relevant.
- Remain a Server Component unless state, effects, browser APIs, or event ownership require a client boundary.
- Consume semantic Aramon tokens.
- Include default, hover, active, focus-visible, disabled, and invalid states when applicable.
- Keep repeated structures still and Frame-based.
- Do not introduce a new token unless the existing semantic set cannot represent a required product state.
- Return the component, usage examples, and a concise accessibility checklist.
`.trim();

export const aramonApplicationPrompt = String.raw`
Design and implement an Aramon application experience for:

{{APPLICATION_BRIEF}}

First produce an attention map:
- Primary user job
- Next meaningful action
- Repeated information structures
- Moments that genuinely cross depth
- Expected session duration

Assign Desk, Frame, Medium, and Lamp roles before choosing components.

Build the application architecture first. Then add one dominant Lamp and at most one persistent live Medium vessel. One transient live Medium overlay may mount while open. Supporting glass remains static. Avoid marketing-page composition, generic dashboard card grids, decorative glass, and repeated liquid animation.

Use React 19, Next.js App Router, TypeScript, Tailwind CSS 4, @aramon/ui, and @aramon/medium. Keep data and static composition on the server. Isolate interactive client components at the narrowest boundary.

Return:
1. Attention hierarchy
2. Material role map
3. Component inventory
4. Token usage
5. Responsive strategy
6. Accessibility strategy
7. Implementation
8. Deviations from the Aramon specification
`.trim();
