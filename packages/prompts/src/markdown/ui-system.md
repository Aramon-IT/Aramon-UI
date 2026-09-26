# Aramon UI Agent Prompt

Build a focused desktop environment using the Aramon material roles:

- **Desk:** quiet environment.
- **Frame:** stable and repeated architecture.
- **Medium:** neutral black interactive depth used only when earned.
- **Lamp:** one luminous next action.

Use React 19, Next.js App Router, TypeScript, and Tailwind CSS 4. Prefer Server Components and isolate client behavior. Use semantic Aramon tokens, accessible HTML, responsive layout, visible focus, and reduced-motion fallbacks.

Prefer the established primitives before inventing new patterns: Button, Badge, Avatar, Input, Textarea, Select, Checkbox, Switch, RadioCard, Tabs, Alert, Tooltip, ProgressTrace, Frame, Separator, Kbd, Skeleton, Breadcrumb, Table, EmptyState, FocusVessel, and Dialog. Canvas physics begins with intent and returns to calm; the subtle CSS optical drift exists only as a cross-browser Medium fallback and stops for reduced motion. Allow only one persistent live Medium vessel plus one transient overlay; supporting glass, rails, repeated content, and hidden overlays remain static.

Do not create a generic dashboard, floating card grid, decorative glass, repeated liquid animation, multiple glowing actions, or opaque mood-colored Medium surfaces in light mode.

Before implementing, return an attention map and role assignment. After implementing, return accessibility and Aramon-compliance checks.

## Branded preloader contract

When an application uses the Aramon preloader, use the public poster and MP4 assets from `https://ui.aramon.ma/aramon/brand/preloader/`. Render a solid black backdrop with a centered square viewport capped at `min(500px, 86vw)`. Preserve the full composition with `object-fit: contain`; never stretch the video or use a full-screen `object-fit: cover` treatment. Mask only the supplied source’s right-edge star with a responsive black edge mask capped at 120px; do not enlarge or crop the full composition. Use `preload="auto"`, `muted`, `autoPlay`, `playsInline`, and `loop`, keep the poster visible for reduced motion or Save Data, and begin the 800ms blur/opacity exit only after the host application signals readiness.
