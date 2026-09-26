import { catalog } from "../../lib/catalog";

export const dynamic = "force-static";
export function GET() {
  const skill = `\n\n## Aramon-elegance UX skill\n- https://ui.aramon.ma/skills/aramon-audience-first-ux/SKILL.md\n\n## Brand materials\n- Preloader and hero patterns: https://ui.aramon.ma/brand-materials.md`;
  const body = [`# Aramon UI`, ``, `Canonical design system for Aramon products and AI agents.`, ``, `## Start`, `- Installation: https://ui.aramon.ma/installation/`, `- Full agent reference: https://ui.aramon.ma/llms-full.txt`, `- Machine catalog: https://ui.aramon.ma/catalog.json`, `- Registry: https://ui.aramon.ma/r`, ``, `## Contract`, `- Use data-aramon-theme="light|dark"; dark is the documentation default.`, `- Lamp is the only primary action treatment.`, `- Medium and Material Background are sparse earned surfaces.`, `- Aramon Preloader is the branded entry transition for loading states.`, `- Use logical CSS for EN/FR/AR and RTL.`, `- Respect keyboard, reduced motion, Save Data, and 44px targets.`, ``, `## Components`, ...catalog.map((entry) => `- ${entry.name}: https://ui.aramon.ma/components/${entry.slug}/index.md`)].join("\n");
  return new Response(body + skill, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
