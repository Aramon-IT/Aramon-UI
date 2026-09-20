import Link from "next/link";
import { DocsShell } from "../_components/docs-shell";

export default function InstallationPage() {
  return <DocsShell current="installation"><main className="docs-page installation-page">
    <header className="page-intro"><h1>Installation</h1><p>Install source you can own, inspect, and adapt—without losing the Aramon contract.</p></header>
    <section className="installation-grid">
      <article><span>01</span><h2>Install a component</h2><p>Text-only components install directly from the public registry with the standard shadcn CLI.</p><pre><code>pnpm dlx shadcn@latest add https://ui.aramon.ma/r/button.json</code></pre></article>
      <article><span>02</span><h2>Import the foundation</h2><p>Load the generated stylesheet once, then set a required theme on the application root.</p><pre><code>{`@import "../styles/aramon.css";\n\n<html data-aramon-theme="light">`}</code></pre></article>
      <article><span>03</span><h2>Install the full system</h2><p>Until the Aramon CLI is published to npm, clone this repository to install the complete catalog and verified binary assets.</p><pre><code>{`pnpm --filter ./packages/cli build\nnode packages/cli/dist/index.js add aramon-ui --cwd /path/to/app`}</code></pre></article>
    </section>
    <div className="installation-links"><Link href="/components">Browse components →</Link><Link href="/patterns">Use a proof recipe →</Link><a href="/llms.txt">Give the system to an agent →</a></div>
  </main></DocsShell>;
}
