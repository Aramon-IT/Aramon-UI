import type { Metadata } from "next";
import Link from "next/link";
import { aramonApplicationPrompt, aramonComponentPrompt, aramonSystemPrompt } from "@aramon/prompts/ui-system";
import { aramonMediumAnimationPrompt, aramonMediumReviewPrompt } from "@aramon/prompts/medium-animation";
import { aramonReviewPrompt } from "@aramon/prompts/review";
import { Brand } from "../_components/brand";

export const metadata: Metadata = {
  title: "AI Prompts · Aramon UI",
  description: "Copy-ready contracts for agents building and reviewing Aramon interfaces.",
};

const prompts = [
  ["System language", "Foundation", aramonSystemPrompt],
  ["Application builder", "Composition", aramonApplicationPrompt],
  ["Component builder", "Primitive", aramonComponentPrompt],
  ["Medium animation", "Physics", aramonMediumAnimationPrompt],
  ["Interface review", "Audit", aramonReviewPrompt],
  ["Medium review", "Physics audit", aramonMediumReviewPrompt],
] as const;

export default function PromptsPage() {
  return (
    <main className="prompts-page min-h-screen bg-aramon-desk text-aramon-ink">
      <header className="route-bar"><Brand /><nav aria-label="Library navigation"><Link href="/components">Components</Link><Link href="/prompts" aria-current="page">Prompts</Link></nav></header>
      <div className="prompts-layout">
        <header className="prompts-hero"><p>ARAMON / AGENT CONTRACTS</p><h1>Prompts that<br />protect identity.</h1><p>Copy-ready design, implementation, animation, and review instructions for AI agents working with Aramon.</p></header>
        <nav className="prompt-index" aria-label="Prompt index">{prompts.map(([name], index) => <a key={name} href={`#prompt-${index + 1}`}><span>0{index + 1}</span>{name}</a>)}</nav>
        <div className="prompt-list">{prompts.map(([name, role, content], index) => <article className="prompt-card" id={`prompt-${index + 1}`} key={name}><header><div><span>0{index + 1} / {role}</span><h2>{name}</h2></div><code>@aramon/prompts</code></header><pre><code>{content}</code></pre></article>)}</div>
        <footer className="docs-footer"><span>Aramon UI / Prompts</span><Link href="/components">← Back to components</Link></footer>
      </div>
    </main>
  );
}
