import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell } from "../_components/docs-shell";
import { catalog, categories } from "../../lib/catalog";

export const metadata: Metadata = { title: "Components · Aramon UI", description: "Installable Aramon UI components, states, behavior, and source." };

export default function ComponentsPage() {
  return <DocsShell current="components"><main className="docs-page index-page">
    <header className="page-intro"><h1>Components</h1><p>Source-owned primitives with explicit states, accessibility, RTL, and reduced-motion behavior.</p></header>
    {categories.map((category) => {
      const items = catalog.filter((entry) => entry.category === category);
      return <section className="catalog-group" key={category}><header><h2>{category}</h2><span>{String(items.length).padStart(2, "0")}</span></header><div>{items.map((entry) => <Link href={`/components/${entry.slug}`} key={entry.slug}><span><strong>{entry.name}</strong><small>{entry.responsibility}</small></span><span aria-hidden="true">→</span></Link>)}</div></section>;
    })}
  </main></DocsShell>;
}
