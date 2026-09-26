"use client";

import { useState } from "react";
import { AnimatedList } from "@aramon/ui/animated-list";
import { AramonPreloader } from "@aramon/ui/aramon-preloader";
import { BlurOutUp } from "@aramon/ui/blur-out-up";
import { Button } from "@aramon/ui/button";
import { FloatingNavbar } from "@aramon/ui/floating-navbar";
import { MaterialBackground } from "@aramon/ui/material-background";
import { NotificationBadge } from "@aramon/ui/notification-badge";
import { TextMorph } from "@aramon/ui/text-morph";

const people = [
  { id: "mina", initials: "M", name: "Mina", action: "joined the session", time: "2m" },
  { id: "youssef", initials: "Y", name: "Youssef", action: "shared a note", time: "6m" },
  { id: "lina", initials: "L", name: "Lina", action: "raised her hand", time: "12m" },
  { id: "adam", initials: "A", name: "Adam", action: "left the room", time: "18m" },
];

export function ComponentPreview({ slug }: { slug: string }) {
  const [items, setItems] = useState(people.slice(0, 3));
  const [morph, setMorph] = useState(false);
  const [reveal, setReveal] = useState(true);

  if (slug === "animated-list") return <div className="interactive-preview"><div className="preview-actions"><Button energy="lamp" onClick={() => setItems((current) => current.length === people.length ? current : [...current, people[current.length]!] )}>Add item</Button><Button onClick={() => setItems((current) => current.slice(0, -1))}>Remove item</Button></div><AnimatedList items={items} getKey={(entry) => entry.id} renderItem={(entry) => <div className="demo-activity"><i>{entry.initials}</i><span><strong>{entry.name}</strong><small>{entry.action}</small></span><time>{entry.time} ago</time></div>} /></div>;

  if (slug === "notification-badge") return <div className="preview-cluster"><NotificationBadge variant="count" count={3} label="3 unread notifications"><Button>Inbox</Button></NotificationBadge><NotificationBadge variant="dot" label="New activity"><Button>Updates</Button></NotificationBadge><NotificationBadge variant="presence" presence="online" label="Mina is online"><span className="demo-avatar">MP</span></NotificationBadge></div>;

  if (slug === "floating-navbar") return <div className="navbar-preview"><FloatingNavbar className="!absolute !bottom-6" items={[{ id: "room", label: "Room" }, { id: "people", label: "People" }, { id: "notes", label: "Notes" }]} defaultActiveItem="room" /></div>;

  if (slug === "text-morph") return <div className="type-preview"><TextMorph className="preview-type" by="word">{morph ? "Build one coherent surface." : "Give every surface a memory."}</TextMorph><Button onClick={() => setMorph((value) => !value)}>Change phrase</Button></div>;

  if (slug === "blur-out-up") return <div className="type-preview"><BlurOutUp key={String(reveal)} className="preview-type" trigger="controlled" active={reveal}>Interfaces with a material memory.</BlurOutUp><Button onClick={() => { setReveal(false); requestAnimationFrame(() => setReveal(true)); }}>Replay</Button></div>;

  if (slug === "material-background") return <div className="material-gallery"><MaterialBackground className="material-preview" poster="/aramon/material/material-background.webp" sources={[{ src: "/aramon/material/material-background.webm", type: "video/webm" }, { src: "/aramon/material/material-background.mp4", type: "video/mp4" }]}><div className="material-preview-copy"><span>Material Background · Overview film</span><strong>Quiet depth for entry moments.</strong><Button energy="lamp">Continue</Button></div></MaterialBackground><MaterialBackground className="material-preview" poster="/aramon/brand/hero/aramon-hero-poster.jpg" sources={[{ src: "/aramon/brand/hero/aramon-hero.webm", type: "video/webm" }, { src: "/aramon/brand/hero/aramon-hero.mp4", type: "video/mp4" }]}><div className="material-preview-copy"><span>Aramon Shining · Hero film</span><strong>Make the first moment glow.</strong><Button energy="lamp">Continue</Button></div></MaterialBackground></div>;

  if (slug === "aramon-preloader") return <div className="preloader-preview"><AramonPreloader src="/aramon/brand/preloader/preloading.mp4" poster="/aramon/brand/preloader/preloading-poster.jpg" /><div><span>Brand entry transition · looping</span><strong>Keep the first moment calm.</strong><small>The film loops until the host app passes <code>ready</code>.</small></div></div>;

  return <div className="generic-preview"><Button energy="lamp">Primary action</Button><Button>Secondary</Button><Button energy="quiet">Quiet</Button><Button loading loadingText="Saving">Save</Button></div>;
}
