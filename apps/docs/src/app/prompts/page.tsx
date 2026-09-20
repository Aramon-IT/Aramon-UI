import type { Metadata } from "next";
import { aramonApplicationPrompt, aramonComponentPrompt, aramonSystemPrompt } from "@aramon/prompts/ui-system";
import { aramonMediumAnimationPrompt, aramonMediumReviewPrompt } from "@aramon/prompts/medium-animation";
import { aramonReviewPrompt } from "@aramon/prompts/review";
import { DocsShell } from "../_components/docs-shell";

export const metadata: Metadata = { title: "Agent prompts · Aramon UI", description: "Copy-ready contracts for agents implementing and reviewing Aramon interfaces." };

const prompts = [
  ["System language", "Foundation", aramonSystemPrompt],
  ["Application builder", "Composition", aramonApplicationPrompt],
  ["Component builder", "Primitive", aramonComponentPrompt],
  ["Medium animation", "Physics", aramonMediumAnimationPrompt],
  ["Interface review", "Audit", aramonReviewPrompt],
  ["Medium review", "Physics audit", aramonMediumReviewPrompt],
] as const;

export default function PromptsPage() {
  return <DocsShell><main className="docs-page prompt-page"><header className="page-intro"><h1>Agent prompts</h1><p>Copy-ready implementation and review contracts. The machine-readable system remains available in llms.txt and the typed catalog.</p></header><div className="prompt-list-new">{prompts.map(([name, role, content]) => <article key={name}><header><span>{role}</span><h2>{name}</h2></header><pre><code>{content}</code></pre></article>)}</div></main></DocsShell>;
}
