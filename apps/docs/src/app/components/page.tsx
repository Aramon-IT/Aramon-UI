import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Alert } from "@aramon/ui/alert";
import { Avatar } from "@aramon/ui/avatar";
import { Badge } from "@aramon/ui/badge";
import { Button } from "@aramon/ui/button";
import { Checkbox } from "@aramon/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@aramon/ui/dialog";
import { FocusVessel } from "@aramon/ui/focus-vessel";
import { Frame } from "@aramon/ui/frame";
import { FieldError, FieldHint, FieldLabel, Input, Textarea } from "@aramon/ui/input";
import { ProgressTrace } from "@aramon/ui/progress-trace";
import { RadioCard } from "@aramon/ui/radio-card";
import { Select } from "@aramon/ui/select";
import { Switch } from "@aramon/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@aramon/ui/tabs";
import { Tooltip } from "@aramon/ui/tooltip";
import { Brand } from "../_components/brand";

export const metadata: Metadata = {
  title: "Components · Aramon UI",
  description: "Explore Aramon UI primitives, variants, states, themes, and Medium interactions.",
};

type Theme = "light" | "dark";

const themes = ["light", "dark"] as const;
const buttonStates = [
  { label: "Rest", state: undefined, disabled: false },
  { label: "Hover", state: "hover", disabled: false },
  { label: "Focus", state: "focus", disabled: false },
  { label: "Pressed", state: "active", disabled: false },
  { label: "Disabled", state: undefined, disabled: true },
] as const;
const buttonEnergies = ["lamp", "reflective", "quiet", "critical"] as const;

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="catalog-section__header"><span>{eyebrow}</span><h2>{title}</h2><p>{description}</p></header>;
}

function ThemeStage({ children, source, theme, className = "" }: { children: ReactNode; source: string; theme: Theme; className?: string }) {
  return (
    <Frame data-aramon-theme={theme} className={`specimen-stage ${className}`}>
      <div className="specimen-stage__title"><span>{theme} field</span><code>{source}</code></div>
      {children}
    </Frame>
  );
}

function ThemePair({ children, source, className }: { children(theme: Theme): ReactNode; source: string; className?: string }) {
  return <div className="catalog-theme-pair">{themes.map((theme) => <ThemeStage key={theme} theme={theme} source={source} className={className}>{children(theme)}</ThemeStage>)}</div>;
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
            <a href="#button">Button</a><a href="#badge">Badge</a><a href="#avatar">Avatar</a><a href="#fields">Fields</a><a href="#choice">Choice</a><a href="#radio">Radio Card</a><a href="#tabs">Tabs</a><a href="#alert">Alert</a><a href="#tooltip">Tooltip</a><a href="#progress">Progress</a><a href="#focus-vessel">Focus Vessel</a><a href="#dialog">Dialog</a>
          </nav>
        </aside>

        <div className="catalog-content">
          <header className="catalog-hero">
            <p>ARAMON UI / COMPONENT LIBRARY</p>
            <h1>Components,<br />in the open.</h1>
            <p>Twelve reusable families, visible in both fields. Inspect variants, states, semantics, accessibility, and approved Medium behavior without hidden theme switches.</p>
          </header>

          <section id="button" className="catalog-section">
            <SectionHeader eyebrow="01 / ACTION" title="Button" description="Lamp identifies the next action, reflective supports it, quiet returns control to language, and critical confirms consequence." />
            <div className="catalog-theme-pair">
              {themes.map((theme) => (
                <ThemeStage key={theme} theme={theme} source="@aramon/ui/button" className="button-specimen">
                  <div className="button-state-grid">
                    <span />{buttonStates.map(({ label }) => <span key={label}>{label}</span>)}
                    {buttonEnergies.map((energy) => <div className="button-state-row" key={energy}><strong>{energy}</strong>{buttonStates.map(({ disabled, label, state }) => <Button key={label} energy={energy} disabled={disabled} data-demo-state={state}>{energy}</Button>)}</div>)}
                  </div>
                  <div className="button-size-row"><span>Sizes</span><Button size="compact">Compact</Button><Button>Default</Button><Tooltip content="Icon buttons need an accessible label."><Button size="icon" aria-label="Add session">+</Button></Tooltip></div>
                  <p className="variant-note">Held states make contrast review deterministic. Runtime components still respond to hover, focus, press, disabled, and keyboard input.</p>
                </ThemeStage>
              ))}
            </div>
          </section>

          <section id="badge" className="catalog-section">
            <SectionHeader eyebrow="02 / STATUS" title="Badge" description="Compact status language uses tone and optional light, never color alone in meaningful copy." />
            <ThemePair source="@aramon/ui/badge">{() => <div className="badge-cluster"><Badge>Draft</Badge><Badge tone="positive" dot>Ready</Badge><Badge tone="attention" dot>Review</Badge><Badge tone="critical" dot>Blocked</Badge></div>}</ThemePair>
          </section>

          <section id="avatar" className="catalog-section">
            <SectionHeader eyebrow="03 / IDENTITY" title="Avatar" description="Initials are the dependable default. Presence remains a secondary signal with a readable label." />
            <ThemePair source="@aramon/ui/avatar">{() => <div className="avatar-cluster"><Avatar size="small" alt="Nabil Mouzouna" fallback="NM" presence="online" /><Avatar alt="Aramon design team" fallback="AD" presence="away" /><Avatar size="large" alt="Product review room" fallback="PR" presence="busy" /><Avatar alt="Research workspace" fallback="RW" presence="offline" /></div>}</ThemePair>
          </section>

          <section id="fields" className="catalog-section">
            <SectionHeader eyebrow="04 / ENTRY" title="Fields" description="Text entry and native selection belong to stable Frame architecture. Guidance persists; errors are explicit." />
            <ThemePair source="@aramon/ui/input · select" className="form-specimen">{(theme) => <div className="solo-form">
              <FieldLabel>Session title<Input defaultValue="Memory models" /><FieldHint>Default field with persistent guidance.</FieldHint></FieldLabel>
              <FieldLabel>Rhythm<Select defaultValue="50"><option value="25">25 minute pulse</option><option value="50">50 minute focus</option><option value="90">90 minute depth</option></Select><FieldHint>Native behavior, Aramon surface.</FieldHint></FieldLabel>
              <FieldLabel>Workspace code<Input aria-invalid="true" defaultValue="FOCUS 01" aria-describedby={`${theme}-field-error`} /><FieldError id={`${theme}-field-error`}>Use lowercase letters and a hyphen.</FieldError></FieldLabel>
              <FieldLabel>Unavailable<Input disabled value="Protected by policy" readOnly /><FieldHint>Unavailable controls remain identifiable.</FieldHint></FieldLabel>
              <FieldLabel className="solo-form__wide">Intention<Textarea defaultValue="Understand the model before taking notes." /></FieldLabel>
            </div>}</ThemePair>
          </section>

          <section id="choice" className="catalog-section">
            <SectionHeader eyebrow="05 / TOGGLE" title="Checkbox + Switch" description="Checkboxes select items; switches change a setting immediately. Both retain native keyboard behavior." />
            <ThemePair source="@aramon/ui/checkbox · switch">{() => <div className="choice-specimen">
              <div className="choice-column"><Checkbox label="Protect this focus block" description="Mute non-essential signals." /><Checkbox defaultChecked label="Save session history" description="Included in the weekly rhythm." /><Checkbox disabled label="Team visibility" description="Unavailable in this workspace." /></div>
              <div className="choice-column"><Switch defaultChecked label="Focus sounds" description="Use the current sound field." /><Switch label="Weekly digest" description="Receive one quiet summary." /><Switch disabled label="Presence sharing" description="Managed by your organization." /></div>
            </div>}</ThemePair>
          </section>

          <section id="radio" className="catalog-section">
            <SectionHeader eyebrow="06 / EXCLUSIVE" title="Radio Card" description="Use when a short set of mutually exclusive options benefits from explanation and spatial comparison." />
            <ThemePair source="@aramon/ui/radio-card">{(theme) => <fieldset className="radio-specimen"><legend className="sr-only">Choose a session rhythm</legend><RadioCard defaultChecked name={`${theme}-rhythm`} value="pulse" label="Pulse" description="A short intentional cycle." meta="25 min" /><RadioCard name={`${theme}-rhythm`} value="depth" label="Depth" description="Sustained work with one pause." meta="50 min" /><RadioCard name={`${theme}-rhythm`} value="studio" label="Studio" description="Extended creative immersion." meta="90 min" /></fieldset>}</ThemePair>
          </section>

          <section id="tabs" className="catalog-section">
            <SectionHeader eyebrow="07 / SWITCH" title="Tabs" description="Arrow keys, Home, and End move between related views without changing navigational depth." />
            <ThemePair source="@aramon/ui/tabs">{() => <Tabs defaultValue="today"><TabsList aria-label="Session period"><TabsTrigger value="today">Today</TabsTrigger><TabsTrigger value="week">This week</TabsTrigger><TabsTrigger value="signal">Signal</TabsTrigger><TabsTrigger value="archive" disabled>Archive</TabsTrigger></TabsList><TabsContent value="today">Two deliberate sessions are ready.</TabsContent><TabsContent value="week">Four focus blocks remain.</TabsContent><TabsContent value="signal">Your strongest work window begins near 09:30.</TabsContent></Tabs>}</ThemePair>
          </section>

          <section id="alert" className="catalog-section">
            <SectionHeader eyebrow="08 / FEEDBACK" title="Alert" description="Contextual feedback sits inside the work instead of interrupting it. Critical announcements use the alert role." />
            <ThemePair source="@aramon/ui/alert" className="alert-specimen">{() => <div className="alert-stack"><Alert title="Signal detected">Your strongest focus window begins at 09:30.</Alert><Alert tone="positive" title="Session protected">Non-essential notifications are muted.</Alert><Alert tone="attention" title="Rhythm changed" action={<Button size="compact" energy="quiet">Review</Button>}>This week has two longer sessions.</Alert><Alert tone="critical" title="Sync paused" action={<Button size="compact" energy="critical">Retry</Button>}>Your latest note remains safely on this device.</Alert></div>}</ThemePair>
          </section>

          <section id="tooltip" className="catalog-section">
            <SectionHeader eyebrow="09 / CLARIFY" title="Tooltip" description="A brief supplement for unfamiliar controls. It appears on hover and keyboard focus; essential information stays in the interface." />
            <ThemePair source="@aramon/ui/tooltip">{() => <div className="tooltip-specimen"><Tooltip content="Create a focus session" side="top"><Button size="icon" aria-label="Create a focus session">+</Button></Tooltip><Tooltip content="Open session settings" side="bottom"><Button energy="reflective">Settings</Button></Tooltip><Tooltip content="Archive after completion" side="right"><Button energy="quiet">Archive</Button></Tooltip></div>}</ThemePair>
          </section>

          <section id="progress" className="catalog-section">
            <SectionHeader eyebrow="10 / SIGNAL" title="Progress Trace" description="Progress stays linear and architectural rather than becoming a decorative chart." />
            <ThemePair source="@aramon/ui/progress-trace" className="progress-specimen">{() => <div className="progress-stack"><ProgressTrace value={18} label="Beginning" /><ProgressTrace value={68} label="Weekly rhythm" /><ProgressTrace value={100} label="Complete" /></div>}</ThemePair>
          </section>

          <section id="focus-vessel" className="catalog-section">
            <SectionHeader eyebrow="11 / MEDIUM · STIR" title="Focus Vessel" description="A subtle autonomous drift now establishes living material everywhere; pointer or touch adds richer canvas physics when supported." />
            <ThemePair source="@aramon/ui/focus-vessel" className="medium-specimen">{(theme) => <FocusVessel eyebrow={`${theme.toUpperCase()} / MEDIUM`} metric={theme === "light" ? "50:00" : "25:00"} title={theme === "light" ? "Memory models" : "Review notes"} action={<Button energy="lamp">Begin session</Button>}>Move or press inside the vessel to disturb its light. The content remains stable.</FocusVessel>}</ThemePair>
          </section>

          <section id="dialog" className="catalog-section">
            <SectionHeader eyebrow="12 / MEDIUM · PRESS" title="Dialog" description="A translucent, blurred decision layer with stable readable type and a contained liquid impulse on press." />
            <ThemePair source="@aramon/ui/dialog" className="dialog-specimen">{(theme) => <div className="dialog-demo"><div><strong>{theme === "light" ? "Light decision" : "Dark decision"}</strong><p>The background remains visible through neutral blurred Medium.</p></div><Dialog><DialogTrigger energy="lamp">Open dialog</DialogTrigger><DialogContent><div><DialogTitle>Begin a focus session?</DialogTitle><DialogDescription className="mt-2">The Medium reacts to the decision surface, while the text remains stable, crisp, and accessible above the liquid layer.</DialogDescription></div><div className="flex justify-end gap-2"><DialogClose energy="quiet">Not now</DialogClose><DialogClose energy="lamp">Begin</DialogClose></div></DialogContent></Dialog></div>}</ThemePair>
          </section>

          <footer className="docs-footer"><span>Aramon UI / 12 families</span><Link href="/prompts">Continue to prompts →</Link></footer>
        </div>
      </div>
    </main>
  );
}
