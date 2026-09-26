export interface CatalogProp {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface CatalogItem {
  slug: string;
  name: string;
  category: "Actions" | "Entry" | "Navigation" | "Feedback" | "Data" | "Surfaces" | "Motion";
  responsibility: string;
  materialRole: string;
  install: string;
  source: string;
  dependencies: string[];
  states: string[];
  accessibility: string;
  keyboard: string;
  reducedMotion: string;
  rtl: string;
  props: CatalogProp[];
}

const commonStates = ["Default", "Hover", "Focus visible", "Active", "Disabled"];
const common = {
  materialRole: "Frame",
  dependencies: ["@aramon/base"],
  states: commonStates,
  accessibility: "Native semantics are preserved and visible focus is never removed.",
  keyboard: "Uses the platform keyboard behavior of its native control.",
  reducedMotion: "State changes remain instant and understandable when motion is reduced.",
  rtl: "Logical properties mirror layout without a separate implementation.",
  props: [] as CatalogProp[],
};

function item(value: Omit<CatalogItem, keyof typeof common | "install" | "source"> & Partial<typeof common>): CatalogItem {
  const install = value.slug === "material-background" || value.slug === "aramon-preloader"
    ? "Use the repository CLI so verified video and poster assets are installed."
    : `pnpm dlx shadcn@latest add https://ui.aramon.ma/r/${value.slug}.json`;
  return { ...common, ...value, install, source: `packages/ui/src/${value.slug}.tsx` };
}

export const catalog: CatalogItem[] = [
  item({ slug: "button", name: "Button", category: "Actions", responsibility: "Triggers a clear user action with Lamp reserved for the primary path.", materialRole: "Lamp or Frame", states: [...commonStates, "Loading", "Critical"], props: [
    { name: "energy", type: '"lamp" | "reflective" | "quiet" | "critical"', defaultValue: '"reflective"', description: "Sets the action hierarchy." },
    { name: "loading", type: "boolean", defaultValue: "false", description: "Disables activation and exposes busy state." },
  ] }),
  item({ slug: "input", name: "Input", category: "Entry", responsibility: "Collects single-line text with persistent labeling, guidance, and errors.", states: [...commonStates, "Invalid"] }),
  item({ slug: "select", name: "Select", category: "Entry", responsibility: "Chooses one value with native selection behavior." }),
  item({ slug: "checkbox", name: "Checkbox", category: "Entry", responsibility: "Selects independent options while retaining native semantics." }),
  item({ slug: "switch", name: "Switch", category: "Entry", responsibility: "Changes a setting immediately and exposes its current state." }),
  item({ slug: "radio-card", name: "Radio Card", category: "Entry", responsibility: "Explains and compares a small set of mutually exclusive choices." }),
  item({ slug: "tabs", name: "Tabs", category: "Navigation", responsibility: "Moves between related panels at the same navigational level.", keyboard: "Arrow keys move between tabs; Home and End select the first and last enabled tab." }),
  item({ slug: "breadcrumb", name: "Breadcrumb", category: "Navigation", responsibility: "Communicates location and links to previous hierarchy levels." }),
  item({ slug: "floating-navbar", name: "Floating Navbar", category: "Navigation", responsibility: "Keeps a small set of high-frequency destinations reachable while optionally yielding to downward scroll.", materialRole: "Floating Frame", dependencies: ["@aramon/base", "motion"], keyboard: "Links and buttons follow native keyboard behavior; active destination uses aria-current.", props: [
    { name: "items", type: "FloatingNavbarItem[]", defaultValue: "—", description: "Destinations or actions to render." },
    { name: "autoHide", type: "boolean", defaultValue: "false", description: "Hides after a downward scroll threshold." },
  ] }),
  item({ slug: "alert", name: "Alert", category: "Feedback", responsibility: "Places contextual semantic feedback beside the work it concerns." }),
  item({ slug: "badge", name: "Badge", category: "Feedback", responsibility: "Labels compact semantic status without becoming a decorative pill." }),
  item({ slug: "notification-badge", name: "Notification Badge", category: "Feedback", responsibility: "Attaches dot, count, or presence information to another element.", materialRole: "Lamp signal", dependencies: ["@aramon/base", "motion"], states: ["Dot", "Count", "Overflow", "Presence", "Attention"], accessibility: "An explicit label announces the badge independently of its visual count or color.", props: [
    { name: "variant", type: '"dot" | "count" | "presence"', defaultValue: '"count"', description: "Selects the semantic badge form." },
    { name: "position", type: "NotificationBadgePosition", defaultValue: '"block-start-inline-end"', description: "Uses a logical attachment position." },
  ] }),
  item({ slug: "tooltip", name: "Tooltip", category: "Feedback", responsibility: "Adds brief clarification to an unfamiliar control." }),
  item({ slug: "progress-trace", name: "Progress Trace", category: "Feedback", responsibility: "Communicates bounded progress as a quiet architectural line." }),
  item({ slug: "avatar", name: "Avatar", category: "Data", responsibility: "Represents a person or group with an image or dependable initials fallback.", materialRole: "Circle exception" }),
  item({ slug: "animated-list", name: "Animated List", category: "Data", responsibility: "Presents a semantic activity stream with controlled layout transitions.", dependencies: ["@aramon/base", "motion"], states: ["Stable", "Entering", "Reordering", "Exiting", "Windowed"], accessibility: "Uses list semantics and a polite live region for count changes; the visual layer is never the only announcement.", keyboard: "Interactive rows retain their own native keyboard behavior; the list itself does not invent selection semantics.", reducedMotion: "Layout and blur transitions are removed immediately.", props: [
    { name: "items", type: "readonly T[]", defaultValue: "—", description: "Controlled collection in display order." },
    { name: "getKey", type: "(item: T) => string", defaultValue: "—", description: "Returns a stable item key." },
    { name: "maxVisible", type: "number", defaultValue: "Infinity", description: "Caps the rendered window." },
  ] }),
  item({ slug: "table", name: "Table", category: "Data", responsibility: "Displays aligned, dense information without turning rows into cards." }),
  item({ slug: "empty-state", name: "Empty State", category: "Data", responsibility: "Explains purposeful absence and offers one clear next action." }),
  item({ slug: "frame", name: "Frame", category: "Surfaces", responsibility: "Groups repeated information on a stable neutral surface." }),
  item({ slug: "focus-vessel", name: "Focus Vessel", category: "Surfaces", responsibility: "Hosts the one persistent Medium surface when focus has been earned.", materialRole: "Medium" }),
  item({ slug: "dialog", name: "Dialog", category: "Surfaces", responsibility: "Places a consequential decision in the top layer and restores focus on close.", materialRole: "Transient Medium", keyboard: "Tab remains in the native modal dialog, Escape dismisses, and focus returns to the trigger." }),
  item({ slug: "separator", name: "Separator", category: "Surfaces", responsibility: "Creates structural division before another container is introduced." }),
  item({ slug: "skeleton", name: "Skeleton", category: "Surfaces", responsibility: "Preserves final composition while content loads." }),
  item({ slug: "kbd", name: "Keyboard Key", category: "Data", responsibility: "Formats compact keyboard notation beside the action it explains." }),
  item({ slug: "material-background", name: "Material Background", category: "Motion", responsibility: "Provides the authorized iridescent film for sparse entry and confirmation compositions.", materialRole: "Material media", dependencies: ["@aramon/base", "binary assets"], states: ["Poster first", "Playing", "Paused", "Save Data", "Reduced motion"], accessibility: "Video is decorative, muted, hidden from assistive technology, and always paired with readable foreground contrast.", keyboard: "No keyboard interaction is required for decorative playback.", reducedMotion: "Renders the poster and never autoplays.", props: [
    { name: "sources", type: "MaterialBackgroundSource[]", defaultValue: "—", description: "WebM and MP4 sources in preference order." },
    { name: "poster", type: "string", defaultValue: "—", description: "Poster used before playback and for fallbacks." },
  ] }),
  item({ slug: "aramon-preloader", name: "Aramon Preloader", category: "Motion", responsibility: "Introduces Aramon applications with a poster-first branded loading moment and a calm blur/fade handoff.", materialRole: "Entry transition", dependencies: ["@aramon/base", "branding assets"], states: ["Loading", "Exiting", "Poster fallback", "Reduced motion", "Save Data"], accessibility: "Exposes one loading status while decorative video remains hidden from assistive technology.", keyboard: "No keyboard interaction is required; the preloader yields automatically.", reducedMotion: "Uses the poster and exits without motion.", props: [
    { name: "src", type: "string", defaultValue: "—", description: "Public MP4 source for the branded preloader film." },
    { name: "poster", type: "string", defaultValue: "—", description: "Immediate visual and fallback when video is unavailable." },
    { name: "minimumDuration", type: "number", defaultValue: "900", description: "Minimum time before the handoff can begin." },
  ] }),
  item({ slug: "text-morph", name: "Text Morph", category: "Motion", responsibility: "Transitions a short opt-in phrase while preserving one intact accessible string.", dependencies: ["@aramon/base", "motion"], states: ["Word diff", "Character diff", "Reduced motion"], accessibility: "The animated tokens are hidden from assistive technology and the complete phrase is exposed once.", reducedMotion: "Substitutes text instantly.", props: [{ name: "by", type: '"word" | "character"', defaultValue: '"word"', description: "Selects the diff unit." }] }),
  item({ slug: "blur-out-up", name: "Blur Out Up", category: "Motion", responsibility: "Reveals a short expressive line with a bounded blur and rise.", dependencies: ["@aramon/base", "motion"], states: ["Mount", "Viewport", "Controlled", "Reduced motion"], accessibility: "The full text is exposed as one accessible string while visual words animate independently.", reducedMotion: "Renders final text immediately.", props: [{ name: "trigger", type: '"mount" | "viewport" | "controlled"', defaultValue: '"mount"', description: "Determines when the reveal occurs." }] }),
];

export const categories = ["Actions", "Entry", "Navigation", "Feedback", "Data", "Surfaces", "Motion"] as const;
export const catalogBySlug = new Map(catalog.map((entry) => [entry.slug, entry]));
