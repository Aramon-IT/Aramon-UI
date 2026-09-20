"use client";

import { useState } from "react";
import { AnimatedList } from "@aramon/ui/animated-list";
import { Button } from "@aramon/ui/button";
import { FloatingNavbar } from "@aramon/ui/floating-navbar";
import { NotificationBadge } from "@aramon/ui/notification-badge";

const initial = [
  { id: "mina", initials: "M", name: "Mina", state: "Answered the prompt", time: "now", presence: "online" },
  { id: "youssef", initials: "Y", name: "Youssef", state: "Opened the shared note", time: "2m", presence: "online" },
  { id: "lina", initials: "L", name: "Lina", state: "Raised her hand", time: "4m", presence: "away" },
] as const;

export function ClassroomProof() {
  const [items, setItems] = useState([...initial]);
  return <div className="classroom-proof">
    <header><div><span>Memory models</span><h2>Room presence</h2></div><NotificationBadge label="3 active students" variant="count" count={items.length}><Button>People</Button></NotificationBadge></header>
    <div className="classroom-stage"><div className="classroom-board"><p>Explain the difference between recognition and recall in one sentence.</p><Button energy="lamp">Share response</Button></div><aside><div className="presence-heading"><strong>Live activity</strong><button type="button" onClick={() => setItems((current) => current.length ? current.slice(0, -1) : [...initial])}>{items.length ? "Clear latest" : "Restore"}</button></div><AnimatedList items={items} getKey={(item) => item.id} renderItem={(item) => <div className="presence-row"><NotificationBadge variant="presence" presence={item.presence} label={`${item.name} is ${item.presence}`}><i>{item.initials}</i></NotificationBadge><span><strong>{item.name}</strong><small>{item.state}</small></span><time>{item.time}</time></div>} /></aside></div>
    <div className="classroom-nav"><FloatingNavbar className="!absolute !bottom-4" defaultActiveItem="room" items={[{ id: "room", label: "Room" }, { id: "people", label: "People" }, { id: "notes", label: "Notes" }, { id: "more", label: "More" }]} /></div>
  </div>;
}
