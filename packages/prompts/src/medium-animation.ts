export const aramonMediumAnimationPrompt = String.raw`
Implement the Aramon Medium liquid animation as a sealed, component-local physics surface.

PHYSICAL MODEL
- The React component is a rigid vessel. Never translate, warp, scale, or deform the vessel.
- A canvas or equivalent render layer lives absolutely inside the vessel, below all content.
- Pointer energy is injected only while the pointer is inside that vessel and uses local coordinates.
- Energy never crosses from one component into another.
- Stir mode injects energy from pointer movement. Press mode injects one local impulse. Off mode renders static material.
- Canvas physics diffuses energy and returns to equilibrium. It does not loop ambiently.
- A subtle transform-only CSS optical drift may loop as the dependable visual fallback. It must stop for reduced motion and never deform content.

VERIFIED PHYSICS VALUES
- Cell size: 10 CSS pixels.
- Wave coefficient: 0.42. Keep it below approximately 0.50 for stability.
- Velocity damping: 0.968.
- Height damping: 0.984.
- Field smoothing: 0.14 with one smoothing pass.
- Light direction: x 0.55, y -0.83.
- Quiet threshold: 0.0012. Local impulses must remain alive long enough to read on large vessels.
- Render supersampling: 2x.
- Optical blur passes: 2.
- Highlight gain after blur: 1.5.

DIRECTOR AND PERFORMANCE
- Use one director loop for every Medium surface.
- Animate only a small fixed number of the most recently touched pools.
- Use Map or WeakMap for element-to-pool lookup.
- Suspend requestAnimationFrame while the document is hidden.
- Mark pools inactive when outside the viewport.
- Cache element bounds and invalidate them on scroll or resize.
- Do not reallocate a canvas unless its simulation-grid dimensions change.
- Clean up event listeners, observers, canvas layers, and animation ownership on detach.

PERFORMANCE TIERS
- Full: pointer stir and press with complete rendering.
- Reduced: retain pointer stir where a pointer is present, lower the impulse, and reduce work. Touch remains press-driven.
- Flat: no simulation; retain static translucent material.
- Select the tier from prefers-reduced-motion, save-data, input modality, measured frame cost, and available browser features.
- Demote when sustained measured work exceeds the budget; never oscillate repeatedly between tiers.

REACT AND NEXT.JS BOUNDARY
- Put "use client" only in the React adapter entry point.
- Keep the core engine framework-independent and free of React imports.
- Initialize through useEffect after hydration. Never mutate server-rendered DOM before hydration.
- Expose explicit attach(), detach(), configure(), and tier APIs.
- Use primitive effect dependencies and keep high-frequency transient values in refs, not state.
- Do not trigger React renders for animation frames or pointer movement.

VISUAL CONTRACT
- Medium is neutral translucent black in light mode.
- Preserve environmental transmission: the scene behind Medium must remain recognizable after blur. Use approximately 0.30-0.57 neutral material alpha by density instead of an opaque card.
- Mood color affects only glint, light response, and subtle dark-mode undertone.
- Content is always above the render layer at a stable z-index.
- Text is never refracted, blurred, displaced, or magnified.
- Support backdrop-filter, a transform-only CSS optical drift fallback, and a static reduced-motion fallback.
- Preserve visible focus and pointer interaction for controls inside the vessel.

DELIVERABLES
Return:
1. Framework-independent TypeScript engine
2. React hook and MediumSurface adapter
3. CSS material recipe
4. Full/reduced/flat tier behavior
5. Cleanup tests
6. Stability and performance tests
7. Reduced-motion and hydration tests
8. Cross-browser fallback test without ResizeObserver, IntersectionObserver, canvas, or hover input
`.trim();

export const aramonMediumReviewPrompt = String.raw`
Audit the supplied liquid animation against Aramon Medium Physics.

Reject the implementation if:
- the vessel itself moves or deforms;
- text enters the distorted layer;
- physics start before hydration;
- each surface owns an independent permanent animation loop;
- offscreen or detached surfaces continue consuming work;
- pointer coordinates are not local to the vessel;
- energy crosses between components;
- canvas physics loops without user intent;
- the CSS optical fallback moves when reduced motion is requested;
- reduced-motion or flat fallbacks are missing;
- light-mode Medium becomes an opaque mood-colored card.

Report findings by severity, explain the physical or performance consequence, and propose the smallest correction that preserves the API.
`.trim();
