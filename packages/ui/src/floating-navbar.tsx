"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { cn } from "./lib/cn";

export interface FloatingNavbarItem {
  id: string;
  label: string;
  href?: string;
  disabled?: boolean;
}

export interface FloatingNavbarProps extends Omit<HTMLMotionProps<"nav">, "onChange"> {
  items: readonly FloatingNavbarItem[];
  activeItem?: string;
  defaultActiveItem?: string;
  onActiveItemChange?(id: string): void;
  autoHide?: boolean;
  scrollThreshold?: number;
  containerRef?: RefObject<HTMLElement | null>;
}

export function FloatingNavbar({ activeItem: controlled, autoHide = false, className, containerRef, defaultActiveItem, items, onActiveItemChange, ref, scrollThreshold = 24, ...props }: FloatingNavbarProps) {
  const [internal, setInternal] = useState(defaultActiveItem ?? items[0]?.id ?? "");
  const active = controlled ?? internal;
  const [visible, setVisible] = useState(true);
  const lastScroll = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!autoHide) return;
    const target = containerRef?.current ?? window;
    const readScroll = () => target instanceof Window ? target.scrollY : target.scrollTop;
    lastScroll.current = readScroll();
    const onScroll = () => {
      const next = readScroll();
      const delta = next - lastScroll.current;
      if (Math.abs(delta) >= scrollThreshold) {
        setVisible(delta < 0 || next <= scrollThreshold);
        lastScroll.current = next;
      }
    };
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [autoHide, containerRef, scrollThreshold]);

  const choose = (id: string) => {
    if (controlled === undefined) setInternal(id);
    onActiveItemChange?.(id);
  };

  return (
    <motion.nav
      ref={ref}
      aria-label={props["aria-label"] ?? "Section navigation"}
      className={cn("aramon-squircle fixed inset-x-3 bottom-3 z-[var(--aramon-layer-sticky)] flex min-h-14 items-center gap-1 rounded-[var(--aramon-radius-surface)] border border-[var(--aramon-hairline)] bg-[color-mix(in_srgb,var(--aramon-frame)_94%,transparent)] p-1.5 shadow-[var(--aramon-shadow-floating)] md:inset-x-auto md:start-1/2 md:w-max md:-translate-x-1/2 rtl:md:translate-x-1/2", className)}
      animate={{ y: visible ? 0 : 96, opacity: visible ? 1 : 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: .2, ease: [.2, 0, 0, 1] }}
      {...props}
    >
      {items.map((item) => {
        const shared = {
          "aria-current": active === item.id ? "page" as const : undefined,
          className: cn("aramon-squircle relative grid min-h-11 flex-1 place-items-center rounded-[10px] px-4 text-[13px] font-semibold text-aramon-ink-2 no-underline transition-colors hover:text-aramon-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--aramon-focus)] aria-[current=page]:bg-[var(--aramon-control)] aria-[current=page]:text-aramon-ink disabled:opacity-45 md:flex-none"),
          onClick: () => choose(item.id),
        };
        return item.href ? <a key={item.id} href={item.href} {...shared}>{item.label}</a> : <button key={item.id} type="button" disabled={item.disabled} {...shared}>{item.label}</button>;
      })}
    </motion.nav>
  );
}
