import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@aramon/ui/button";
import { Checkbox } from "@aramon/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@aramon/ui/dialog";
import { FocusVessel } from "@aramon/ui/focus-vessel";
import { Frame } from "@aramon/ui/frame";
import { FieldHint, FieldLabel, Input, Textarea } from "@aramon/ui/input";
import { ProgressTrace } from "@aramon/ui/progress-trace";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@aramon/ui/tabs";
import { Brand } from "../_components/brand";

export const metadata: Metadata = {
  title: "Components · Aramon UI",
  description: "Explore Aramon UI primitives, variants, states, and Medium interactions.",
};

const buttonStates = [
  { label: "Rest", state: undefined, disabled: false },
  { label: "Hover", state: "hover", disabled: false },
  { label: "Focus", state: "focus", disabled: false },
  { label: "Pressed", state: "active", disabled: false },
  { label: "Disabled", state: undefined, disabled: true },
] as const;

const buttonEnergies = ["lamp", "reflective", "quiet"] as const;

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="catalog-section__header">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

export default function ComponentsPage() {
  return (
    <main className="catalog-page min-h-screen bg-aramon-desk text-aramon-ink">
      <header className="route-bar">
        <Brand />
        <nav aria-label="Library navigation"><Link href="/components" aria-current="page">Components</Link><Link href="/prompts">Prompts</Link></nav>
      </header>

      <div className="catalog-layout">
        <aside className="catalog-index">
          <span>COMPONENT INDEX</span>
          <nav aria-label="Component index">
            <a href="#button">Button</a><a href="#fields">Fields</a><a href="#choice">Choice</a><a href="#tabs">Tabs</a><a href="#progress">Progress</a><a href="#focus-vessel">Focus Vessel</a><a href="#dialog">Dialog</a>
          </nav>
        </aside>

        <div className="catalog-content">
          <header className="catalog-hero">
            <p>ARAMON UI / INITIAL LIBRARY</p>
            <h1>Components,<br />in the open.</h1>
            <p>Inspect every variant, interaction state, theme response, and approved Medium behavior independently.</p>
          </header>

          <section id="button" className="catalog-section">
            <SectionHeader eyebrow="01 / ACTION" title="Button" description="Lamp identifies the next action, reflective supports it, and quiet returns control to language." />
            <div className="catalog-theme-pair">
              {(["light", "dark"] as const).map((theme) => (
                <Frame key={theme} data-aramon-theme={theme} className="variant-stage">
                  <div className="variant-stage__title"><span>{theme} field</span><code>@aramon/ui/button</code></div>
                  <div className="button-state-grid">
                    <span />
                    {buttonStates.map(({ label }) => <span key={label}>{label}</span>)}
                    {buttonEnergies.map((energy) => (
                      <div className="button-state-row" key={energy}>
                        <strong>{energy}</strong>
                        {buttonStates.map(({ disabled, label, state }) => (
                          <Button key={label} energy={energy} disabled={disabled} data-demo-state={state}>{energy}</Button>
                        ))}
                      </div>
                    ))}
                  </div>
                  <p className="variant-note">The Hover, Focus, and Pressed columns hold the visual state so motion and contrast can be reviewed without chasing the pointer.</p>
                </Frame>
              ))}
            </div>
          </section>

          <section id="fields" className="catalog-section">
            <SectionHeader eyebrow="02 / ENTRY" title="Fields" description="Inputs belong to stable Frame architecture. Their feedback is precise and never liquid." />
            <Frame className="component-solo-stage">
              <div className="solo-form">
                <FieldLabel>Session title<Input defaultValue="Memory models" /><FieldHint>Default field with persistent guidance.</FieldHint></FieldLabel>
                <FieldLabel>Disabled<Input disabled value="Protected by policy" readOnly /><FieldHint>Unavailable controls remain identifiable.</FieldHint></FieldLabel>
                <FieldLabel className="solo-form__wide">Intention<Textarea defaultValue="Understand the model before taking notes." /></FieldLabel>
              </div>
            </Frame>
          </section>

          <section id="choice" className="catalog-section">
            <SectionHeader eyebrow="03 / CHOICE" title="Checkbox" description="A native input with a quiet treatment, clear label, and optional explanation." />
            <Frame className="component-solo-stage component-row">
              <Checkbox label="Protect this focus block" description="Mute non-essential signals." />
              <Checkbox defaultChecked label="Save session history" description="Included in the weekly rhythm." />
              <Checkbox disabled label="Team visibility" description="Unavailable in this workspace." />
            </Frame>
          </section>

          <section id="tabs" className="catalog-section">
            <SectionHeader eyebrow="04 / SWITCH" title="Tabs" description="Arrow keys, Home, and End move between related views without changing depth." />
            <Frame className="component-solo-stage">
              <Tabs defaultValue="today"><TabsList aria-label="Session period"><TabsTrigger value="today">Today</TabsTrigger><TabsTrigger value="week">This week</TabsTrigger><TabsTrigger value="signal">Signal</TabsTrigger></TabsList><TabsContent value="today">Two deliberate sessions are ready.</TabsContent><TabsContent value="week">Four focus blocks remain.</TabsContent><TabsContent value="signal">Your strongest work window begins near 09:30.</TabsContent></Tabs>
            </Frame>
          </section>

          <section id="progress" className="catalog-section">
            <SectionHeader eyebrow="05 / SIGNAL" title="Progress Trace" description="Progress stays linear and architectural rather than becoming a decorative chart." />
            <Frame className="component-solo-stage progress-stack"><ProgressTrace value={18} label="Beginning" /><ProgressTrace value={68} label="Weekly rhythm" /><ProgressTrace value={100} label="Complete" /></Frame>
          </section>

          <section id="focus-vessel" className="catalog-section">
            <SectionHeader eyebrow="06 / MEDIUM · STIR" title="Focus Vessel" description="The primary focus object earns pointer-driven liquid response. Move inside it; content stays still." />
            <div className="focus-pair" data-aramon-theme="dark"><FocusVessel metric="50:00" title="Memory models" action={<Button energy="lamp">Begin session</Button>}>Full pointer stir on capable devices.</FocusVessel><FocusVessel metric="25:00" title="Review notes" action={<Button energy="reflective">Open notes</Button>}>A second vessel demonstrates the shared two-surface budget.</FocusVessel></div>
          </section>

          <section id="dialog" className="catalog-section">
            <SectionHeader eyebrow="07 / MEDIUM · PRESS" title="Dialog" description="A more translucent glass layer, stronger blur, readable type, and one contained liquid impulse on press." />
            <Frame className="component-solo-stage dialog-demo-stage">
              <div><strong>Decision surface</strong><p>The backdrop remains visible through neutral blurred Medium.</p></div>
              <Dialog><DialogTrigger energy="lamp">Open dialog</DialogTrigger><DialogContent><div><DialogTitle>Begin a focus session?</DialogTitle><DialogDescription className="mt-2">The Medium reacts to the decision surface, while the text remains stable, crisp, and accessible above the liquid layer.</DialogDescription></div><div className="flex justify-end gap-2"><DialogClose energy="quiet">Not now</DialogClose><DialogClose energy="lamp">Begin</DialogClose></div></DialogContent></Dialog>
            </Frame>
          </section>

          <footer className="docs-footer"><span>Aramon UI / Components</span><Link href="/prompts">Continue to prompts →</Link></footer>
        </div>
      </div>
    </main>
  );
}
