import { catalog, catalogBySlug } from "../../../../lib/catalog";

export const dynamicParams = false;
export function generateStaticParams() { return catalog.map((entry) => ({ slug: entry.slug })); }
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const entry = catalogBySlug.get((await params).slug);
  if (!entry) return new Response("Not found", { status: 404 });
  const api = entry.props.length ? entry.props.map((prop) => `- \`${prop.name}\`: \`${prop.type}\` — ${prop.description} Default: \`${prop.defaultValue}\`.`).join("\n") : "- Forwards native element props and ref.";
  const body = [`# ${entry.name}`, ``, entry.responsibility, ``, `## Material role`, entry.materialRole, ``, `## Install`, `\`${entry.install}\``, ``, `## States`, ...entry.states.map((state) => `- ${state}`), ``, `## API`, api, ``, `## Accessibility`, entry.accessibility, ``, `## Keyboard`, entry.keyboard, ``, `## Reduced motion`, entry.reducedMotion, ``, `## RTL`, entry.rtl, ``, `## Source`, `- ${entry.source}`, `- https://ui.aramon.ma/r/${entry.slug}.json`].join("\n");
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } });
}
