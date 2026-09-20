"use client";

import Link from "next/link";
import { MaterialBackground } from "@aramon/ui/material-background";
import { DocsShell } from "./_components/docs-shell";
import { HomeShowcase } from "./_components/home-showcase";
import { useDocsLocale } from "./_components/locale-provider";

const homeCopy = {
  en: { headline: ["Interfaces with a", "material memory."], intro: "A source-owned design system for Aramon products and the agents that build them.", install: "Install Aramon UI", read: "Read the system", caption: "Light through engineered glass. A study in material response.", contract: "One contract. Every surface.", contractBody: "Shared tokens, components, patterns, and agent guidance create one recognizable language.", surfaces: [["Web", "Product interfaces"], ["Mobile", "Companion surfaces"], ["Agents", "Machine-readable UI"], ["Teams", "Shared vocabulary"]], agent: "Start with one URL.", agentBody: "Give an agent ui.aramon.ma. It can read the contract, install source, inspect states, and compose a complete surface without guessing the brand.", open: "Open installation" },
  fr: { headline: ["Des interfaces avec", "une mémoire matérielle."], intro: "Un système de design maîtrisé à la source pour les produits Aramon et les agents qui les construisent.", install: "Installer Aramon UI", read: "Lire le système", caption: "La lumière traverse un verre façonné. Une étude de réponse matérielle.", contract: "Un contrat. Toutes les surfaces.", contractBody: "Des jetons, composants, modèles et consignes partagés créent un langage reconnaissable.", surfaces: [["Web", "Interfaces produit"], ["Mobile", "Surfaces compagnons"], ["Agents", "UI lisible par machine"], ["Équipes", "Vocabulaire partagé"]], agent: "Commencez par une URL.", agentBody: "Donnez ui.aramon.ma à un agent. Il peut lire le contrat, installer les sources, inspecter les états et composer une interface cohérente.", open: "Ouvrir l’installation" },
  ar: { headline: ["واجهات بذاكرة", "مادية."], intro: "نظام تصميم مملوك المصدر لمنتجات أرامون والوكلاء الذين يبنونها.", install: "ثبّت Aramon UI", read: "اقرأ النظام", caption: "ضوء يعبر زجاجاً مُهندساً. دراسة في الاستجابة المادية.", contract: "عقد واحد. لكل واجهة.", contractBody: "رموز ومكوّنات وأنماط وإرشادات مشتركة تصنع لغة بصرية واضحة.", surfaces: [["الويب", "واجهات المنتجات"], ["الجوال", "واجهات مرافقة"], ["الوكلاء", "واجهة مقروءة آلياً"], ["الفرق", "مفردات مشتركة"]], agent: "ابدأ بعنوان واحد.", agentBody: "أعطِ الوكيل ui.aramon.ma ليقرأ العقد ويثبّت المصدر ويفحص الحالات ويبني واجهة متّسقة.", open: "افتح دليل التثبيت" },
} as const;

export default function Home() {
  const { locale } = useDocsLocale();
  const copy = homeCopy[locale];
  return <DocsShell current="home" localized><main className="docs-page home-page">
    <section className="home-hero">
      <h1>{copy.headline[0]}<br />{copy.headline[1]}</h1>
      <p>{copy.intro}</p>
      <div className="hero-actions"><Link className="hero-primary" href="/installation">{copy.install} <span>→</span></Link><Link className="hero-secondary" href="/components">{copy.read}</Link></div>
    </section>

    <section className="home-showcase" aria-label="Aramon UI composed preview">
      <HomeShowcase />
      <figure className="material-figure">
        <MaterialBackground className="material-home" poster="/aramon/material/material-background.webp" sources={[{ src: "/aramon/material/material-background.webm", type: "video/webm" }, { src: "/aramon/material/material-background.mp4", type: "video/mp4" }]} scrim="linear-gradient(180deg, transparent 55%, rgb(0 0 0 / .18))" />
        <figcaption>{copy.caption}</figcaption>
      </figure>
    </section>

    <section className="contract-section">
      <h2>{copy.contract}</h2>
      <p>{copy.contractBody}</p>
      <div className="surface-rail">{copy.surfaces.map(([name, description]) => <span key={name}><strong>{name}</strong>{description}</span>)}</div>
    </section>

    <section className="agent-section">
      <div><h2>{copy.agent}</h2><p>{copy.agentBody}</p></div>
      <div className="agent-command"><code dir="ltr">pnpm dlx shadcn@latest add https://ui.aramon.ma/r/button.json</code><Link className="agent-install-link" href="/installation">{copy.open}</Link></div>
    </section>
  </main></DocsShell>;
}
