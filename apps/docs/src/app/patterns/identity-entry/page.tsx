import { DocsShell } from "../../_components/docs-shell";
import { IdentityProof } from "../../_components/identity-proof";

export default function IdentityEntryPage() {
  return <DocsShell><main className="docs-page pattern-page"><header className="page-intro"><h1>Identity Entry</h1><p>A sparse entry composition using the material video once, with explicit errors and confirmation state.</p></header><IdentityProof /><section className="recipe-notes"><h2>Recipe contract</h2><ul><li>Material video is decorative and poster-first.</li><li>The form remains a neutral Frame; Medium is not layered over the video.</li><li>Errors persist beside their field and confirmation replaces the form without a second page effect.</li><li>Localized labels and logical alignment work in English, French, and Arabic.</li></ul></section></main></DocsShell>;
}
