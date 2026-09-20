import { DocsShell } from "../_components/docs-shell";

const colors = [
  ["Clear Desk", "#ffffff"], ["Quiet Desk", "#f5f5f7"], ["Primary Ink", "#1d1d1f"], ["Night Desk", "#09090b"], ["Night Frame", "#161617"], ["Lamp Ivory", "#f5efe5"],
] as const;

export default function FoundationsPage() {
  return <DocsShell><main className="docs-page foundations-page"><header className="page-intro"><h1>Foundations</h1><p>The contract beneath every Aramon surface: neutral fields, one sans voice, squircle geometry, and bounded motion.</p></header>
    <section className="foundation-section"><h2>Color</h2><div className="swatch-grid">{colors.map(([name, value]) => <article key={name}><i style={{ background: value }} /><strong>{name}</strong><code>{value}</code></article>)}</div><p>Lamp is the only primary action treatment. Medium and video color never become general-purpose palette tokens.</p></section>
    <section className="foundation-section"><h2>Typography</h2><div className="type-scale"><p className="type-display">Material memory.</p><p className="type-headline">One clear hierarchy.</p><p className="type-title">Product title</p><p>Body text stays readable across English, French, and Arabic. Product lines cap at 68 characters where practical.</p><code>const system = &quot;agent-readable&quot;;</code></div></section>
    <section className="foundation-section"><h2>Spacing and shape</h2><div className="shape-grid"><div><span>12</span><strong>Control</strong></div><div><span>20</span><strong>Surface</strong></div><div><span>28</span><strong>Feature</strong></div></div><p>All spatial decisions land on a 4px grid. `corner-shape: squircle` is progressive enhancement over these rounded fallbacks.</p></section>
    <section className="foundation-section"><h2>Motion</h2><div className="motion-table"><div><strong>120ms</strong><span>Feedback</span></div><div><strong>200ms</strong><span>Controls</span></div><div><strong>420ms</strong><span>Entrances</span></div><div><strong>700ms</strong><span>Material only</span></div></div></section>
  </main></DocsShell>;
}
