import Link from "next/link";
import { buttonClasses } from "@aramon/ui/button";
import { Frame } from "@aramon/ui/frame";
import { Brand } from "./_components/brand";
import { ComponentLab } from "./_components/component-lab";

const packages = [
  ["01", "Tokens", "Semantic color, type, space, motion, and physics values."],
  ["02", "UI", "Server-compatible React primitives with Aramon defaults."],
  ["03", "Medium", "A client boundary for the liquid material runtime."],
  ["04", "CLI", "The future init, add, update, and list workflow."],
  ["05", "Prompts", "Normative UI, token, animation, and review instructions for AI agents."],
];

const milestones = [
  ["Foundation", "Workspace, tokens, package boundaries", "Ready"],
  ["Primitives", "Button, Frame, Input, Choice, Tabs, Dialog", "Ready"],
  ["Medium", "Shared physics director and performance tiers", "Ready"],
  ["Distribution", "Registry resolver and Aramon CLI", "Queued"],
];

export default function Home() {
  return (
    <main className="docs-shell min-h-screen bg-aramon-desk text-aramon-ink">
      <aside className="docs-rail">
          <Brand />
        <nav aria-label="Documentation sections">
          <a href="#architecture">01 Architecture</a>
          <a href="#components">02 Components</a>
          <a href="#roadmap">03 Roadmap</a>
          <Link href="/components">04 Library</Link>
          <Link href="/prompts">05 Prompts</Link>
        </nav>
        <p>Workspace 0.0.0<br />Independent system</p>
      </aside>

      <section className="min-w-0" id="top">
        <header className="docs-bar">
          <span>ARAMON / SYSTEM</span>
          <span className="docs-status"><i /> Foundation ready</span>
        </header>

        <div className="docs-content">
          <section className="docs-hero">
            <p>REACT 19 · NEXT.JS 16 · TAILWIND CSS 4</p>
            <h1>A system,<br />not a skin.</h1>
            <div>
              <p>An independent component language for focused Aramon applications. Stable architecture, responsive material, and one source of light.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/components" className={buttonClasses({ energy: "lamp" })}>Explore components</Link>
                <Link href="/prompts" className={buttonClasses({ energy: "quiet" })}>Read the prompts</Link>
              </div>
            </div>
          </section>

          <section id="architecture" className="docs-section">
            <header className="docs-section-title">
              <span>01 / ARCHITECTURE</span>
              <h2>Small workspace.<br />Clear boundaries.</h2>
              <p>Each package has one responsibility. The documentation app proves that the packages work together before a CLI distributes them.</p>
            </header>
            <div className="docs-package-grid">
              {packages.map(([number, name, description]) => (
                <Frame className="docs-package" key={name}>
                  <span>{number}</span>
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <code>{name === "CLI" ? "aramon-ui" : `@aramon/${name.toLowerCase()}`}</code>
                </Frame>
              ))}
            </div>
          </section>

          <section id="components" className="docs-section">
            <header className="docs-section-title">
              <span>02 / FIRST PRIMITIVES</span>
              <h2>One language.<br />Both fields.</h2>
              <p>Light and dark are shown together so every component can be judged as a system—not as a theme switch that hides half the work.</p>
            </header>
            <ComponentLab />
          </section>

          <section id="roadmap" className="docs-section docs-roadmap">
            <header className="docs-section-title">
              <span>03 / ROADMAP</span>
              <h2>Prove first.<br />Distribute second.</h2>
              <p>The system grows from real product use. The CLI comes after component APIs are stable enough to copy confidently.</p>
            </header>
            <Frame className="overflow-hidden">
              {milestones.map(([name, description, status], index) => (
                <article className="docs-roadmap-row" key={name}>
                  <code>0{index + 1}</code>
                  <div><strong>{name}</strong><small>{description}</small></div>
                  <span data-status={status}>{status}</span>
                </article>
              ))}
            </Frame>
          </section>

          <footer className="docs-footer"><span>Aramon UI</span><span>Initialized 2026</span></footer>
        </div>
      </section>
    </main>
  );
}
