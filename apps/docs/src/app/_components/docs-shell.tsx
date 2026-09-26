"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { catalog } from "../../lib/catalog";
import { useDocsLocale } from "./locale-provider";
import { SiteSearch } from "./site-search";
import { ThemeControls } from "./theme-controls";

const shellCopy = {
  en: { search: "Search documentation", start: "Start", overview: "Overview", installation: "Installation", foundations: "Foundations", patterns: "Patterns", components: "Components", all: "All components", agents: "Agents", prompts: "Prompts", menu: "Menu" },
  fr: { search: "Rechercher dans la documentation", start: "Démarrer", overview: "Vue d’ensemble", installation: "Installation", foundations: "Fondations", patterns: "Modèles", components: "Composants", all: "Tous les composants", agents: "Agents", prompts: "Instructions", menu: "Menu" },
  ar: { search: "ابحث في التوثيق", start: "البداية", overview: "نظرة عامة", installation: "التثبيت", foundations: "الأسس", patterns: "الأنماط", components: "المكوّنات", all: "كل المكوّنات", agents: "الوكلاء", prompts: "التوجيهات", menu: "القائمة" },
} as const;

function BrandLink({ className }: { className: string }) {
  return <Link href="/" className={className} aria-label="Aramon UI home">
    <span className="brand-mark" aria-hidden="true" />
    <span className="brand-wordmark">ARAMON <span>UI</span></span>
  </Link>;
}

export function DocsShell({ children, current, localized = false }: { children: ReactNode; current?: string; localized?: boolean }) {
  const { locale } = useDocsLocale();
  const copy = shellCopy[locale];
  const featured = catalog.filter((item) => ["button", "input", "animated-list", "notification-badge", "floating-navbar", "material-background", "text-morph", "blur-out-up"].includes(item.slug));
  const motion = catalog.filter((item) => ["text-morph", "blur-out-up"].includes(item.slug));
  const nav = <nav aria-label="Documentation">
    <section><h2>{copy.start}</h2><Link aria-current={current === "home" ? "page" : undefined} href="/">{copy.overview}</Link><Link aria-current={current === "installation" ? "page" : undefined} href="/installation">{copy.installation}</Link><Link href="/foundations">{copy.foundations}</Link><Link href="/patterns">{copy.patterns}</Link></section>
    <section><h2>{copy.components}</h2><Link aria-current={current === "components" ? "page" : undefined} href="/components">{copy.all}</Link>{featured.filter((entry) => entry.slug !== "material-background").map((entry) => <Link aria-current={current === entry.slug ? "page" : undefined} key={entry.slug} href={`/components/${entry.slug}`}>{entry.name}</Link>)}<Link aria-current={current === "material-background" ? "page" : undefined} href="/components/material-background">Background</Link></section>
    <section><h2>Loaders &amp; Preloaders</h2><Link aria-current={current === "aramon-preloader" ? "page" : undefined} href="/components/aramon-preloader">Aramon Preloader</Link></section>
    <section><h2>{copy.agents}</h2><Link href="/prompts">{copy.prompts}</Link><a href="/llms.txt">llms.txt</a><a href="/llms-full.txt">llms-full.txt</a></section>
  </nav>;
  return <div className="site-shell">
    <aside className="site-rail" aria-label="Documentation navigation">
      <BrandLink className="site-brand" />
      <SiteSearch items={catalog} placeholder={copy.search} />
      {nav}
      <p>Source-owned · React 19 · v1</p>
    </aside>
    <div className="site-main">
      <header className="site-bar"><BrandLink className="mobile-brand" /><span className="site-version">v1.0</span><ThemeControls /><details className="mobile-nav"><summary>{copy.menu}</summary><div><SiteSearch items={catalog} placeholder={copy.search} />{nav}</div></details></header>
      <div id="main-content" lang={localized ? locale : "en"} dir={localized ? undefined : "ltr"}>{children}</div>
    </div>
  </div>;
}
