import { DocsShell } from "../../_components/docs-shell";
import { ClassroomProof } from "../../_components/classroom-proof";

export default function ClassroomPresencePage() {
  return <DocsShell><main className="docs-page pattern-page"><header className="page-intro"><h1>Classroom Presence</h1><p>A high-interaction composition where activity is alive but the room remains quiet. No ambient video.</p></header><ClassroomProof /><section className="recipe-notes"><h2>Recipe contract</h2><ul><li>Animated List communicates changes through layout and a polite announcement.</li><li>Presence uses color and an explicit accessible label.</li><li>Floating Navbar is container-aware in product shells and becomes full width on mobile.</li><li>The board owns focus; activity remains subordinate and dense screens stay material-free.</li></ul></section></main></DocsShell>;
}
