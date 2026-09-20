import Link from "next/link";
import { DocsShell } from "../_components/docs-shell";

export default function PatternsPage() {
  return <DocsShell><main className="docs-page index-page"><header className="page-intro"><h1>Patterns</h1><p>Installable proof compositions that show how primitives become recognizably Aramon without migrating a production application.</p></header>
    <section className="pattern-list"><Link href="/patterns/identity-entry"><span><strong>Identity Entry</strong><small>Material Background, one earned Medium surface, localized controls, errors, and confirmation.</small></span><span>Entry</span></Link><Link href="/patterns/classroom-presence"><span><strong>Classroom Presence</strong><small>Animated activity, notification state, and container-aware navigation without ambient video.</small></span><span>Interaction</span></Link></section>
    <section className="pattern-rules"><h2>Composition rules</h2><ol><li>Begin with the task and information hierarchy.</li><li>Spend Lamp on the next meaningful action.</li><li>Use Medium or material video once, when the moment earns it.</li><li>Prove loading, error, empty, keyboard, RTL, and reduced-motion behavior.</li></ol></section>
  </main></DocsShell>;
}
