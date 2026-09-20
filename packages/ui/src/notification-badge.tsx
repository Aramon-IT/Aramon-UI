"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "./lib/cn";

export type NotificationBadgeVariant = "dot" | "count" | "presence";
export type NotificationBadgePosition = "block-start-inline-start" | "block-start-inline-end" | "block-end-inline-start" | "block-end-inline-end";
export type NotificationPresence = "online" | "away" | "busy" | "offline";

export interface NotificationBadgeProps extends Omit<ComponentPropsWithRef<"span">, "children"> {
  children: ReactNode;
  label: string;
  variant?: NotificationBadgeVariant;
  count?: number;
  overflowAt?: number;
  position?: NotificationBadgePosition;
  presence?: NotificationPresence;
  attention?: boolean;
}

const positions: Record<NotificationBadgePosition, string> = {
  "block-start-inline-start": "top-0 start-0 -translate-x-1/3 -translate-y-1/3 rtl:translate-x-1/3",
  "block-start-inline-end": "top-0 end-0 translate-x-1/3 -translate-y-1/3 rtl:-translate-x-1/3",
  "block-end-inline-start": "bottom-0 start-0 -translate-x-1/3 translate-y-1/3 rtl:translate-x-1/3",
  "block-end-inline-end": "bottom-0 end-0 translate-x-1/3 translate-y-1/3 rtl:-translate-x-1/3",
};

const presenceColors: Record<NotificationPresence, string> = {
  online: "bg-[var(--aramon-success)]",
  away: "bg-[var(--aramon-attention)]",
  busy: "bg-[var(--aramon-critical)]",
  offline: "bg-[var(--aramon-ink-3)]",
};

export function NotificationBadge({ attention = false, children, className, count = 0, label, overflowAt = 99, position = "block-start-inline-end", presence = "online", ref, variant = "count", ...props }: NotificationBadgeProps) {
  const reduceMotion = useReducedMotion();
  const content = variant === "count" ? (count > overflowAt ? `${overflowAt}+` : count) : null;
  return (
    <span ref={ref} className={cn("relative inline-flex", className)} {...props}>
      {children}
      <motion.span
        role="status"
        aria-label={label}
        className={cn(
          "absolute z-10 grid min-h-4 min-w-4 place-items-center border-2 border-[var(--aramon-desk)] text-[10px] font-semibold leading-none",
          positions[position],
          variant === "count" && "aramon-squircle rounded-md bg-[var(--aramon-lamp)] px-1 text-[var(--aramon-lamp-ink)]",
          variant === "dot" && "size-3 rounded-full bg-[var(--aramon-lamp)]",
          variant === "presence" && cn("size-3 rounded-full", presenceColors[presence]),
        )}
        animate={attention && !reduceMotion ? { scale: [1, 1.14, 1] } : undefined}
        transition={attention && !reduceMotion ? { duration: 1.4, repeat: Infinity, repeatDelay: 1.8 } : { duration: 0 }}
      >
        <span aria-hidden="true">{content}</span>
      </motion.span>
    </span>
  );
}
