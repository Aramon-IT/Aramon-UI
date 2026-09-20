"use client";

import { AnimatedList } from "@aramon/ui/animated-list";
import { NotificationBadge } from "@aramon/ui/notification-badge";

const activity = [
  { id: "1", initials: "MP", name: "Mina Park", action: "Updated the token contract", time: "2m" },
  { id: "2", initials: "YK", name: "Youssef Karim", action: "Joined the review", time: "8m" },
  { id: "3", initials: "LB", name: "Lina Benali", action: "Shared an entry pattern", time: "14m" },
];

export function HomeShowcase() {
  return <div className="home-specimen" lang="en">
    <header><strong>Component preview</strong><span>Core primitives in context</span></header>
    <div className="spec-row"><span>Button</span><button className="mini-lamp">Primary</button><button className="mini-control">Secondary</button></div>
    <div className="spec-row"><span>Field</span><input aria-label="Example command" placeholder="Enter a command…" /></div>
    <div className="spec-row"><span>Notification</span><NotificationBadge variant="count" count={3} label="3 unread notifications"><button className="bell-button" type="button" aria-label="Open notifications">Alerts</button></NotificationBadge></div>
    <AnimatedList className="activity-list" items={activity} getKey={(item) => item.id} renderItem={(item) => <div className="activity-row"><i>{item.initials}</i><span><strong>{item.name}</strong><small>{item.action}</small></span><time>{item.time}</time></div>} />
  </div>;
}
