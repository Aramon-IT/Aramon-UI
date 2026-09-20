import type { MetadataRoute } from "next";
import { catalog } from "../lib/catalog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ui.aramon.ma";
  const paths = ["", "/installation", "/foundations", "/components", "/patterns", "/patterns/identity-entry", "/patterns/classroom-presence", "/prompts"];
  return [...paths.map((path, index) => ({ url: `${base}${path}`, lastModified: "2026-09-20", changeFrequency: "monthly" as const, priority: index === 0 ? 1 : .8 })), ...catalog.map((entry) => ({ url: `${base}/components/${entry.slug}`, lastModified: "2026-09-20", changeFrequency: "monthly" as const, priority: .7 }))];
}
