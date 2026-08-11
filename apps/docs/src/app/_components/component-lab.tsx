import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  FieldHint,
  FieldLabel,
  FocusVessel,
  Frame,
  Input,
  ProgressTrace,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "@aramon/ui";

const animationRoles = [
  ["MediumSurface", "stir · press · off", "Living material container", "@aramon/medium/react"],
  ["FocusVessel", "stir", "One primary focus object", "@aramon/ui/focus-vessel"],
  ["Dialog", "press", "Contained top-layer response", "@aramon/ui/dialog"],
  ["Frame + lists", "off / static", "Repeated architecture must stay quiet", "@aramon/ui/frame"],
];

function ThemeLab({ theme }: { theme: "light" | "dark" }) {
  const label = theme === "light" ? "Light field" : "Dark field";
  return (
    <section className="theme-lab" data-aramon-theme={theme} aria-label={`${label} components`}>
      <header className="theme-lab__header">
        <div><i /><span>{label}</span></div>
        <code>data-aramon-theme=&quot;{theme}&quot;</code>
      </header>

      <div className="theme-lab__body">
        <div className="lab-group">
          <span className="docs-label">BUTTON / ENERGY</span>
          <div className="flex flex-wrap gap-2.5">
            <Button energy="lamp">Create session</Button>
            <Button energy="reflective">Save draft</Button>
            <Button energy="quiet">Cancel</Button>
          </div>
        </div>

        <div className="lab-form-grid">
          <FieldLabel>
            Session title
            <Input defaultValue="Memory models" aria-describedby={`${theme}-title-hint`} />
            <FieldHint id={`${theme}-title-hint`}>A calm, specific name keeps the work legible.</FieldHint>
          </FieldLabel>
          <FieldLabel>
            Intention
            <Textarea defaultValue="Understand the model before taking notes." />
          </FieldLabel>
        </div>

        <div className="lab-group">
          <span className="docs-label">CHOICE / NATIVE CONTROL</span>
          <Checkbox defaultChecked label="Protect this focus block" description="Mute non-essential signals until the session ends." />
        </div>

        <Frame className="lab-frame">
          <Tabs defaultValue="today">
            <TabsList aria-label="Session scope">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This week</TabsTrigger>
              <TabsTrigger value="signal">Signal</TabsTrigger>
            </TabsList>
            <TabsContent value="today">Two deliberate sessions are ready. Nothing else asks for attention.</TabsContent>
            <TabsContent value="week">Four focus blocks remain across the current rhythm.</TabsContent>
            <TabsContent value="signal">Your strongest work window begins near 09:30.</TabsContent>
          </Tabs>
          <ProgressTrace value={68} label="Weekly rhythm" />
        </Frame>

        <FocusVessel
          eyebrow="MEDIUM / STIR"
          metric="50:00"
          title="Memory models"
          action={<Button energy="lamp">Begin session</Button>}
        >
          Move across the vessel to disturb its light. The content itself never warps.
        </FocusVessel>

        <div className="lab-dialog-row">
          <div>
            <span className="docs-label">DIALOG / PRESS</span>
            <p>The overlay receives one contained ripple when pressed.</p>
          </div>
          <Dialog>
            <DialogTrigger energy="reflective">Open dialog</DialogTrigger>
            <DialogContent>
              <div>
                <DialogTitle>Begin a focus session?</DialogTitle>
                <DialogDescription className="mt-2">The Medium reacts to the decision surface, while the text remains stable and readable.</DialogDescription>
              </div>
              <div className="flex justify-end gap-2">
                <DialogClose energy="quiet">Not now</DialogClose>
                <DialogClose energy="lamp">Begin</DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}

export function ComponentLab() {
  return (
    <>
      <div className="theme-labs">
        <ThemeLab theme="light" />
        <ThemeLab theme="dark" />
      </div>

      <section className="physics-reference" aria-labelledby="physics-reference-title">
        <header>
          <span className="docs-label">MEDIUM / USAGE CONTRACT</span>
          <h3 id="physics-reference-title">Movement has a role.</h3>
          <p>Use the living material only where attention gathers or a decision enters. Repeated UI remains architectural and still.</p>
        </header>
        <div className="physics-reference__table">
          {animationRoles.map(([component, interaction, purpose, source]) => (
            <article key={component}>
              <strong>{component}</strong>
              <span>{interaction}</span>
              <p>{purpose}</p>
              <code>{source}</code>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
