# Aramon interface language

Use this reference for visual structure, themes, components, interaction styling, and motion. These roles describe behavior rather than a fixed appearance.

## Material roles

### Desk — environment

The Desk is the calm plane supporting the work. It may carry atmosphere but should not compete with content.

Use for app canvases, backgrounds, and negative space. Avoid strong decorative motifs behind dense work.

### Frame — architecture

Frame creates stable structure. It groups information without pretending to float or react.

Use for navigation, panels, rows, tables, form regions, and repeated cards. Repeated work stays still and aligned.

### Medium — earned depth

Medium is a responsive material for focus, contextual tools, and overlays. It acknowledges intent and settles back to calm.

Use sparingly for a focus vessel, an important live context, or a temporary overlay. Keep content above the effect; never distort text. Do not use Medium for every list item or persistent navigation element.

### Lamp — priority

Lamp reveals the next meaningful action, active trace, or selected state. It is a scarce attention resource.

Use one dominant Lamp in a decision area. Secondary actions are reflective or quiet. If everything glows, nothing guides.

## Composition rules

- Start from reading order and task hierarchy.
- Use semantic tokens; components do not invent local colors or effects.
- Prefer structural alignment over collections of unrelated cards.
- Give whitespace a job: separation, pacing, or focus. Empty size without function is waste.
- Keep data-dense repeated content compact and scan-friendly.
- Let light indicate priority; do not use it as decoration.
- Themes may alter environmental values, but behavioral roles stay constant.
- Light mode must be designed, not produced by inverting dark colors.

## Controls

- Inputs behave as recesses in the Frame; focus catches the rim.
- Selection may borrow a measured Lamp treatment.
- Menus and popovers use Aramon surfaces and tokens rather than unstyled browser-era visuals when a custom control can remain accessible.
- Primary buttons state meaningful actions. Quiet actions such as Cancel should not compete after completion or publication.
- Button size reflects action importance and label length, not a desire to fill the row.

## Motion

Motion follows this rhythm:

```text
intent → local response → diffusion → calm
```

- Animate state transitions, not constant ambience.
- Preserve top-to-bottom reading order for content entrances.
- Use blur and movement only when they clarify a transition.
- Never apply content animation to loading skeletons.
- Avoid moving whole vessels like liquid; animate their internal field.
- Honor reduced motion and offer a flat fallback when performance is limited.

## Accessibility floor

- WCAG AA text contrast.
- Visible keyboard focus.
- Approximately 44px touch targets where practical.
- No information encoded by color alone.
- Semantic HTML and meaningful labels.
- Logical focus management for dialogs and menus.
- RTL layout and reading order.
- Reduced-motion behavior.
- Legible fallback without translucency, blur, or custom physics.

## Non-goals

Aramon is not synonymous with dark mode, glassmorphism, gradients, oversized cards, or one specific sidebar. A product may look different from Workspace and still be unmistakably Aramon when its attention, material roles, language, and motion behave correctly.
