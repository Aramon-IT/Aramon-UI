---
name: aramon-audience-first-ux
description: Design, review, or refactor Aramon product experiences around audience psychology, workflow truth, attention hierarchy, and the Desk/Frame/Medium/Lamp language. Use for Aramon journeys, dashboards, forms, navigation, empty states, responsive behavior, or UX critique; do not use merely to copy Workspace screens or apply decorative styling.
---

# Aramon Audience-First UX

Build an experience that teaches people what the product is, what is true now, and what they should do next. Treat visual beauty as a consequence of clear behavior, not the starting point.

## Begin with human and domain truth

Before proposing screens or editing code:

1. Identify each audience, their job, their context, and what they are likely not to know.
2. Trace the real domain sequence: who creates something, when it becomes valid, who can see it, and what happens next.
3. Separate persisted, live, preview, draft, unavailable, and future data. Never silently mix mock data with real data.
4. Identify the highest-cost misunderstanding. Design the screen to prevent it.
5. State assumptions when evidence is missing. Ask only when a choice would materially alter the workflow or authorization model.

For detailed audience questions and state modeling, read [references/audience-and-workflow.md](references/audience-and-workflow.md).

## Build the attention model before the layout

For every screen, decide in this order:

- **Orientation:** Where am I, in language the audience understands?
- **Current truth:** What is happening now? What is available, unavailable, live, private, or already complete?
- **Next action:** What is the one most useful action at this moment?
- **Consequence:** What will that action change, and who will receive or see it?
- **Supporting context:** What secondary information helps the decision without competing with it?

The overview must answer the audience's urgent questions without requiring navigation. A teacher may need the next session, unreleased work, and a route into management. A student may need the next session, newly released work, and progress. Do not assume the same dashboard hierarchy for every role.

Use progressive disclosure:

- Show the next decision first.
- Reveal advanced controls only when relevant.
- Replace impossible actions with a useful explanation and a path to resolve the dependency.
- Prefer explicit empty states over decorative blank space.
- Confirm the exact scope of consequential actions, such as the groups or students who will receive a release.

## Preserve workflow legitimacy

The interface must reflect the business event that makes content legitimate. Do not expose data merely because it exists in storage.

- Drafts remain private.
- Audience-scoped content appears only after the required assignment or release.
- Live interactions remain attached to their execution context.
- Reusable content can be assigned again without duplication.
- Orphan states are supported only where the domain permits them and are labeled clearly.
- Future services may have visible placeholders, but never fake operational behavior.

When a workflow crosses services, preserve ownership boundaries. Document the contract; do not invent access, permissions, or synchronization behavior.

## Apply the Aramon material roles

Assign behavioral roles before styling. Read [references/aramon-language.md](references/aramon-language.md) when creating or changing visual structure, components, themes, or motion.

- **Desk:** calm environment and negative space; never asks for attention.
- **Frame:** stable architecture for navigation, forms, rows, and repeated information.
- **Medium:** responsive depth earned by a focused interaction, contextual tool, or overlay.
- **Lamp:** the single luminous cue for the next meaningful action or selected trace.

Use one dominant Lamp action per decision area. Keep repeated content structurally quiet. Do not turn every card into a focal object, every surface into glass, or every metric into a hero.

## Write for confidence

Use the audience's vocabulary, not internal implementation terms. Labels should state the object or action directly. Supporting copy should explain consequence or unblock uncertainty.

- Prefer “Release to 2 groups” over “Submit.”
- Prefer “No groups yet — create a group before publishing” over an empty selector.
- Name branded concepts consistently, such as “Bounty Points.”
- Distinguish “not created,” “not assigned,” “not released,” “not available,” and “coming soon.”
- Do not claim success for local-only or mocked behavior. Mark previews honestly.

Keep all added product copy in the localization system. Check English, French, and Arabic meaning rather than relying on literal word substitution.

## Design states, not screenshots

Specify and implement at least the states that materially change the user's decision:

- loading and skeleton;
- empty before first use;
- populated;
- draft/private;
- active/live;
- success with visible outcome;
- validation error with recovery;
- dependency unavailable;
- denied;
- archived/restorable when supported.

Do not animate loading skeleton text. Motion should acknowledge a state change, follow reading order, and return to calm. Preserve reduced-motion behavior.

## Make interaction usable under pressure

Assume teachers may act during a live class and students may arrive without training.

- Keep time-sensitive controls obvious and close to their context.
- Make destructive or high-impact scope explicit.
- Avoid oversized controls that distort information hierarchy.
- Use previews when they reduce uncertainty, and keep them synchronized with inputs.
- Make keyboard focus visible, touch targets at least 44px where practical, and color non-exclusive as a signal.
- Preserve RTL layout semantics, responsive reading order, contrast, and flat fallbacks for expensive effects.

## Review before declaring the experience complete

Test the experience as a novice in each role, not as the person who built it. Read [references/review-method.md](references/review-method.md) for a structured critique.

At minimum, verify:

- the next action is identifiable within a few seconds;
- the page explains blocked actions rather than merely disabling them;
- visible data has one clear source and truth status;
- role and permission differences are reflected in both UI and server behavior;
- empty and failure states remain useful;
- the experience works in English, French, Arabic/RTL, keyboard navigation, reduced motion, narrow screens, light mode, and dark mode;
- visual hierarchy still works when real content is longer or sparser than fixtures.

## Expected output from this skill

Choose the smallest artifact that serves the request. For a new flow or substantial refactor, normally produce:

1. audience and context assumptions;
2. the domain/state flow;
3. the attention hierarchy for each role;
4. screen and interaction decisions;
5. Aramon material-role assignments;
6. state, accessibility, localization, and responsive requirements;
7. evidence from testing or a clear list of unverified risks.

Do not reproduce Workspace's exact navigation, cards, proportions, copy, or information architecture unless the new product independently needs them. Transfer the reasoning method and behavioral principles.
