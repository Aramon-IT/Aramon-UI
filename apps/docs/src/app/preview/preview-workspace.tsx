"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MediumSurface } from "@aramon/medium/react";
import { Badge } from "@aramon/ui/badge";
import { Button, buttonClasses } from "@aramon/ui/button";
import { Frame } from "@aramon/ui/frame";
import { FieldLabel, Input } from "@aramon/ui/input";
import { ProgressTrace } from "@aramon/ui/progress-trace";
import { Select } from "@aramon/ui/select";
import { Switch } from "@aramon/ui/switch";
import { Tooltip } from "@aramon/ui/tooltip";
import styles from "./preview.module.css";

type Theme = "light" | "dark";
type WorkspaceMode = "approval" | "library";
type IconName = "home" | "search" | "focus" | "library" | "settings" | "sun" | "moon" | "arrow" | "clock" | "spark";

const approvalNavigation = [
  { icon: "home" as const, label: "Today", detail: "Your deliberate workspace" },
  { icon: "focus" as const, label: "Focus", detail: "One protected session" },
  { icon: "library" as const, label: "Library", detail: "Notes and references" },
  { icon: "clock" as const, label: "Rhythm", detail: "Patterns across the week" },
];

const libraryNavigation = [
  { icon: "library" as const, label: "Components", detail: "Primitives, variants, and states", href: "/components" },
  { icon: "focus" as const, label: "Materials", detail: "Desk, Frame, Medium, and Lamp", href: "/#materials" },
  { icon: "spark" as const, label: "Prompts", detail: "Instructions for AI coding agents", href: "/prompts" },
  { icon: "clock" as const, label: "Roadmap", detail: "Registry and release path", href: "/#roadmap" },
];

const approvalTasks = [
  { title: "Map the memory model", meta: "Concept · 18 min", done: true },
  { title: "Review active recall notes", meta: "Review · 12 min", done: false },
  { title: "Write the final explanation", meta: "Create · 20 min", done: false },
];

const libraryTasks = [
  { title: "Foundation primitives", meta: "Tokens and architecture · Ready", done: true },
  { title: "Medium material", meta: "Special vessels only · Approved", done: true },
  { title: "Registry distribution", meta: "Source-owned installation · Ready", done: true },
  { title: "Component catalog", meta: "18 families · Growing", done: false },
];

function Icon({ name }: { name: IconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 1.7 };
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      {name === "home" ? <><path {...common} d="m4 10 8-6 8 6v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1Z" /></> : null}
      {name === "search" ? <><circle {...common} cx="10.5" cy="10.5" r="6.5" /><path {...common} d="m16 16 4 4" /></> : null}
      {name === "focus" ? <><path {...common} d="M8 3H4a1 1 0 0 0-1 1v4M16 3h4a1 1 0 0 1 1 1v4M8 21H4a1 1 0 0 1-1-1v-4M16 21h4a1 1 0 0 0 1-1v-4" /><circle {...common} cx="12" cy="12" r="3" /></> : null}
      {name === "library" ? <><path {...common} d="M5 4h4v16H5zM10 4h4v16h-4zM15 5l3.5-1 3.5 15-3.5 1z" /></> : null}
      {name === "settings" ? <><circle {...common} cx="12" cy="12" r="3" /><path {...common} d="M19 13.5v-3l-2-.7-.7-1.7.9-1.9-2.1-2.1-1.9.9-1.7-.7-.7-2h-3l-.7 2-1.7.7-1.9-.9L4.1 6.2 5 8.1l-.7 1.7-2 .7v3l2 .7.7 1.7-.9 1.9 2.1 2.1 1.9-.9 1.7.7.7 2h3l.7-2 1.7-.7 1.9.9 2.1-2.1-.9-1.9.7-1.7Z" /></> : null}
      {name === "sun" ? <><circle {...common} cx="12" cy="12" r="3.5" /><path {...common} d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></> : null}
      {name === "moon" ? <path {...common} d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" /> : null}
      {name === "arrow" ? <path {...common} d="M5 12h14M14 7l5 5-5 5" /> : null}
      {name === "clock" ? <><circle {...common} cx="12" cy="12" r="9" /><path {...common} d="M12 7v5l3 2" /></> : null}
      {name === "spark" ? <path {...common} d="m12 2 1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5Z" /> : null}
    </svg>
  );
}

function GlassVessel({ children, className = "", id, interaction = "stir", live = true }: { children: ReactNode; className?: string; id?: string; interaction?: "press" | "stir"; live?: boolean }) {
  return (
    <div id={id} className={`${styles.glass} ${className}`} data-medium-policy={live ? "live" : "static"}>
      {live ? (
        <MediumSurface density="dialog" interaction={interaction} className={styles.mediumSurface}>
          {children}
        </MediumSurface>
      ) : <div className={styles.staticSurface}>{children}</div>}
    </div>
  );
}

function PreviewDialog({ mode, open, onOpenChange }: { mode: WorkspaceMode; open: boolean; onOpenChange(open: boolean): void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  if (!open) return null;

  const library = mode === "library";

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      onCancel={(event) => { event.preventDefault(); onOpenChange(false); }}
      onClose={() => onOpenChange(false)}
      onClick={(event) => { if (event.target === event.currentTarget) onOpenChange(false); }}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        onOpenChange(false);
      }}
    >
      <GlassVessel className={styles.dialogVessel} interaction="press">
        <div className={styles.dialogContent}>
          <div className={styles.dialogIcon}><Icon name="spark" /></div>
          <div>
            <span className={styles.eyebrow}>{library ? "MEDIUM CONTRACT" : "PROTECTED SESSION"}</span>
            <h2>{library ? "Depth must be earned." : "Enter the quiet field?"}</h2>
            <p>{library ? "Live liquid physics belongs to one persistent special vessel and, when needed, one temporary overlay. Everything else remains stable Frame architecture." : "Aramon will hold this workspace for fifty minutes and soften everything that does not belong to the current intention."}</p>
          </div>
          <Switch defaultChecked label={library ? "Use live physics here" : "Mute outside signals"} description={library ? "This dialog temporarily owns the second animation budget." : "Essential calls remain available."} />
          <div className={styles.dialogActions}>
            {library ? null : <Button energy="quiet" onClick={() => onOpenChange(false)}>Not yet</Button>}
            <Button energy="lamp" onClick={() => onOpenChange(false)}>{library ? "Return to the library" : "Begin 50 minutes"}</Button>
          </div>
        </div>
      </GlassVessel>
    </dialog>
  );
}

export function PreviewWorkspace({ mode = "approval" }: { mode?: WorkspaceMode }) {
  const library = mode === "library";
  const navigation = library ? libraryNavigation : approvalNavigation;
  const tasks = library ? libraryTasks : approvalTasks;
  const [theme, setTheme] = useState<Theme>("light");
  const [activeItem, setActiveItem] = useState(library ? "Components" : "Focus");
  const [dialogOpen, setDialogOpen] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <main className={styles.preview} data-aramon-theme={theme}>
      <div className={styles.atmosphere} aria-hidden="true" />

      <header className={styles.titleBar}>
        <div className={styles.trafficLights} aria-hidden="true"><i /><i /><i /></div>
        <div className={styles.windowTitle}>
          <Image src={`${basePath}/aramon-mark.svg`} width={18} height={18} alt="" unoptimized />
          <span>{library ? "Aramon UI" : "Aramon Focus"}</span>
          <small>{library ? "Open component system" : "Approval study · local only"}</small>
        </div>
        <Badge tone="positive" dot>{library ? "Direction approved" : "Medium online"}</Badge>
      </header>

      <section className={styles.scene} aria-label={library ? "Aramon UI library workspace" : "Aramon desktop workspace preview"}>
        <GlassVessel className={styles.rail} interaction="press" live={false}>
          <div className={styles.railContent}>
            <div className={styles.railBrand}>
              <Image src={`${basePath}/aramon-mark.svg`} width={24} height={24} alt="Aramon" unoptimized />
            </div>
            <nav className={styles.railNav} aria-label={library ? "Library shortcuts" : "Workspace shortcuts"}>
              {navigation.map((item) => {
                const control = library && "href" in item ? (
                  <Link href={item.href} aria-label={item.label} aria-current={activeItem === item.label ? "page" : undefined} className={styles.railButton} onClick={() => setActiveItem(item.label)}><Icon name={item.icon} /></Link>
                ) : (
                  <button type="button" aria-label={item.label} aria-current={activeItem === item.label ? "page" : undefined} className={styles.railButton} onClick={() => setActiveItem(item.label)}><Icon name={item.icon} /></button>
                );
                return <Tooltip key={item.label} content={item.label} side="right">{control}</Tooltip>;
              })}
            </nav>
            <div className={styles.railUtilities}>
              <Tooltip content={library ? "Search components" : "Search the workspace"} side="right"><button type="button" className={styles.railButton} aria-label="Search"><Icon name="search" /></button></Tooltip>
              <Tooltip content={library ? "System settings" : "Workspace settings"} side="right"><button type="button" className={styles.railButton} aria-label="Settings"><Icon name="settings" /></button></Tooltip>
              <Tooltip content={`Use ${theme === "light" ? "dark" : "light"} mode`} side="right">
                <button type="button" className={styles.railButton} aria-label={`Use ${theme === "light" ? "dark" : "light"} mode`} onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}>
                  <Icon name={theme === "light" ? "moon" : "sun"} />
                </button>
              </Tooltip>
            </div>
          </div>
        </GlassVessel>

        <GlassVessel id={library ? "materials" : undefined} className={styles.commandPanel}>
          <div className={styles.commandContent}>
            <header className={styles.panelHeader}>
              <div><span className={styles.eyebrow}>{library ? "ARAMON UI" : "WORKSPACE"}</span><h1>{library ? "Library" : "Focus"}</h1></div>
              <Badge>{library ? "18 / families" : "01 / active"}</Badge>
            </header>

            <nav className={styles.commandNav} aria-label={library ? "Library sections" : "Focus workspace"}>
              {navigation.map((item) => {
                const active = activeItem === item.label;
                const content = <><span className={styles.commandItemIcon}><Icon name={item.icon} /></span><span><strong>{item.label}</strong><small>{item.detail}</small></span><Icon name="arrow" /></>;
                return library && "href" in item ? (
                  <Link key={item.label} href={item.href} className={styles.commandItem} data-active={active || undefined} onClick={() => setActiveItem(item.label)}>{content}</Link>
                ) : (
                  <button key={item.label} type="button" className={styles.commandItem} data-active={active || undefined} onClick={() => setActiveItem(item.label)}>
                    {content}
                  </button>
                );
              })}
            </nav>

            <div className={styles.commandRule} />
            <div className={styles.quickForm}>
              <FieldLabel>{library ? "Install" : "Intention"}<Input readOnly={library} defaultValue={library ? "shadcn add ui.aramon.ma/r/button.json" : "Understand before remembering"} /></FieldLabel>
              <FieldLabel>{library ? "Target" : "Rhythm"}<Select defaultValue={library ? "next" : "50"}>{library ? <><option value="next">Next.js + Tailwind 4</option><option value="react">React + Tailwind 4</option></> : <><option value="25">25 minute pulse</option><option value="50">50 minute focus</option><option value="90">90 minute studio</option></>}</Select></FieldLabel>
              <Switch defaultChecked label={library ? "Both fields" : "Quiet signals"} description={library ? "Every component is reviewed in light and dark." : "Keep only essential notifications."} />
            </div>

            <div className={styles.profileRow}>
              <span className={styles.avatar}>{library ? "A" : "NM"}</span>
              <span><strong>{library ? "Aramon UI" : "Nabil"}</strong><small>{library ? "Foundation 0.1" : "Creative workspace"}</small></span>
              <Icon name="arrow" />
            </div>
          </div>
        </GlassVessel>

        <Frame className={styles.mainFrame}>
          <header className={styles.mainHeader}>
            <div>
              <span className={styles.eyebrow}>{library ? "REACT 19 · NEXT.JS 16 · TAILWIND CSS 4" : "THURSDAY · 14 AUGUST"}</span>
              <h2>{library ? <>A system,<br />not a skin.</> : <>A quieter place<br />to finish the thought.</>}</h2>
            </div>
            <div className={styles.themeSwitch} aria-label="Preview theme">
              <button type="button" data-active={theme === "light" || undefined} onClick={() => setTheme("light")}><Icon name="sun" /> Light</button>
              <button type="button" data-active={theme === "dark" || undefined} onClick={() => setTheme("dark")}><Icon name="moon" /> Dark</button>
            </div>
          </header>

          <div className={styles.focusGrid}>
            <section className={styles.focusCard}>
              <div className={styles.focusCardTop}><Badge tone="positive" dot>{library ? "Direction approved" : "Ready"}</Badge><span>{library ? "v0.1" : "50 min"}</span></div>
              <div className={styles.focusMetric}><strong>{library ? "18" : "50:00"}</strong><span>{library ? "families in both fields" : "Memory models"}</span></div>
              <ProgressTrace value={library ? 28 : 34} label={library ? "Catalog coverage" : "Preparation"} />
              <div className={styles.actionRow}>
                {library ? <Link href="/components" className={buttonClasses({energy:"lamp"})}>Explore components</Link> : <Button energy="lamp" onClick={() => setDialogOpen(true)}>Begin session</Button>}
                {library ? <Link href="/prompts" className={buttonClasses({energy:"reflective"})}>Read prompts</Link> : <Button energy="reflective">Review notes</Button>}
                <Button energy="quiet" onClick={() => library ? setDialogOpen(true) : undefined}>{library ? "Inspect Medium" : "Later"}</Button>
              </div>
            </section>

            <section id={library ? "roadmap" : undefined} className={styles.taskPanel}>
              <header><span>{library ? "SYSTEM PATH" : "SESSION PATH"}</span><small>{tasks.length} steps</small></header>
              <div className={styles.taskList}>
                {tasks.map((task, index) => (
                  <label key={task.title} className={styles.taskRow}>
                    <input type="checkbox" defaultChecked={task.done} />
                    <span className={styles.taskIndex}>0{index + 1}</span>
                    <span><strong>{task.title}</strong><small>{task.meta}</small></span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <footer className={styles.mainFooter}>
            <span><i /> {library ? "Approved material direction" : "Scene transmission active"}</span>
            <span>{library ? "Medium budget · one persistent + one transient" : "Move across the glass to disturb its light"}</span>
          </footer>
        </Frame>
      </section>

      <PreviewDialog mode={mode} open={dialogOpen} onOpenChange={setDialogOpen} />
    </main>
  );
}
