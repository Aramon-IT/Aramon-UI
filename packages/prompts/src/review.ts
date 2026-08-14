export const aramonReviewPrompt = String.raw`
Review the supplied interface for compliance with Aramon Medium Physics.

Evaluate these dimensions:

IDENTITY
- Does it feel like a focused desktop environment instead of a conventional website?
- Is identity carried by hierarchy and behavior rather than copied decoration?

ROLE DISCIPLINE
- Is Desk quiet?
- Does Frame own stable and repeated content?
- Is each Medium surface functionally earned?
- Is there one dominant Lamp identifying the next meaningful action?

LIGHT MODE
- Is Medium neutral black?
- Are mood colors restricted to atmosphere and glint?
- Are reflective secondary controls cool and translucent rather than dark colored blocks?

MOTION
- Does motion begin with intent and return to calm?
- Does the vessel stay still?
- Is text protected from distortion?
- Are active simulation costs bounded?
- Is live Medium limited to one persistent signature vessel plus one transient overlay?
- Do supporting glass, repeated content, rails, and closed overlays avoid mounting physics?

ACCESSIBILITY
- Check semantic HTML, contrast, keyboard focus, touch targets, reduced motion, reflow, and non-color state communication.

IMPLEMENTATION
- Check server/client boundaries, component composability, semantic token use, cleanup, and avoidance of unnecessary client JavaScript.

Return:
1. Short verdict
2. Findings ordered by severity
3. What already expresses Aramon correctly
4. Required changes
5. Optional refinements
6. Final acceptance checklist
`.trim();
