import { catalog } from "../../lib/catalog";

export const dynamic = "force-static";
export function GET() {
  return Response.json({ name: "Aramon UI", version: "1.0.0", themeAttribute: "data-aramon-theme", registry: "https://ui.aramon.ma/r", components: catalog });
}
