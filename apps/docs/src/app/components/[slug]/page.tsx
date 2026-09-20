import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsShell } from "../../_components/docs-shell";
import { ComponentPreview } from "../../_components/component-preview";
import { catalog, catalogBySlug } from "../../../lib/catalog";

export const dynamicParams = false;
export function generateStaticParams() { return catalog.map((entry) => ({ slug: entry.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const entry = catalogBySlug.get((await params).slug);
  return entry ? { title: `${entry.name} · Aramon UI`, description: entry.responsibility } : {};
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = catalogBySlug.get(slug);
  if (!entry) notFound();
  return <DocsShell current={slug}><main className="docs-page detail-page">
    <header className="detail-hero"><nav aria-label="Breadcrumb"><Link href="/components">Components</Link><span>/</span><span>{entry.name}</span></nav><div><h1>{entry.name}</h1><p>{entry.responsibility}</p></div><code>{entry.install}</code></header>
    <section className="detail-preview"><header><span>Live preview</span><a href={`https://ui.aramon.ma/r/${entry.slug}.json`}>Registry source</a></header><ComponentPreview slug={entry.slug} /></section>
    <div className="detail-grid">
      <div className="detail-copy">
        <section><h2>Responsibility</h2><p>{entry.responsibility}</p><dl><div><dt>Material role</dt><dd>{entry.materialRole}</dd></div><div><dt>Source</dt><dd><code>{entry.source}</code></dd></div><div><dt>Dependencies</dt><dd>{entry.dependencies.join(", ")}</dd></div></dl></section>
        <section><h2>Anatomy</h2><div className="anatomy-line"><span>Container</span><span>Content</span><span>State</span><span>Assistive text</span></div></section>
        <section><h2>States</h2><ul className="state-list">{entry.states.map((state) => <li key={state}>{state}</li>)}</ul></section>
        <section><h2>Accessibility</h2><p>{entry.accessibility}</p><h3>Keyboard</h3><p>{entry.keyboard}</p><h3>Reduced motion</h3><p>{entry.reducedMotion}</p><h3>RTL</h3><p>{entry.rtl}</p></section>
        <section><h2>Installation</h2><pre><code>{entry.install}</code></pre><p>Standard shadcn installation is also available for text-only components:</p><pre><code>{`pnpm dlx shadcn@latest add https://ui.aramon.ma/r/${entry.slug}.json`}</code></pre></section>
      </div>
      <aside className="api-panel" aria-label={`${entry.name} API`}><h2>API</h2>{entry.props.length ? <dl>{entry.props.map((prop) => <div key={prop.name}><dt><code>{prop.name}</code><span>{prop.type}</span></dt><dd>{prop.description}<small>Default: {prop.defaultValue}</small></dd></div>)}</dl> : <p>This component forwards the matching native element props and ref.</p>}<a href={`/components/${entry.slug}/index.md`}>Read as Markdown →</a></aside>
    </div>
  </main></DocsShell>;
}
