"use client";

import { cloneElement, useEffect, useId, useRef, useState, type ComponentPropsWithRef, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/cn";

export type TooltipSide = "top" | "right" | "bottom";

export interface TooltipProps extends Omit<ComponentPropsWithRef<"span">, "content" | "children"> {
  children: ReactElement<{ "aria-describedby"?: string }>;
  content: ReactNode;
  side?: TooltipSide;
}

export function Tooltip({ children, className, content, ref, side = "top", ...props }: TooltipProps) {
  const id = useId();
  const anchorRef = useRef<HTMLSpanElement | null>(null);
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<CSSProperties>();

  const setRefs = (node: HTMLSpanElement | null) => {
    anchorRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  useEffect(() => {
    if (!open || !anchorRef.current) return;
    const update = () => {
      const box = anchorRef.current?.getBoundingClientRect();
      if (!box) return;
      const positions = {
        top: { left: box.left + box.width / 2, top: box.top - 10, transform: "translate(-50%, -100%)" },
        right: { left: box.right + 10, top: box.top + box.height / 2, transform: "translate(0, -50%)" },
        bottom: { left: box.left + box.width / 2, top: box.bottom + 10, transform: "translate(-50%, 0)" },
      } satisfies Record<TooltipSide, CSSProperties>;
      setStyle({ position: "fixed", ...positions[side] });
    };
    const dismiss = (event: PointerEvent) => { if (!anchorRef.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open, side]);

  const describedBy = [children.props["aria-describedby"], id].filter(Boolean).join(" ");
  return (
    <span
      ref={setRefs}
      className={cn("inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
      onPointerUp={(event) => { if (event.pointerType === "touch") setOpen((value) => !value); }}
      {...props}
    >
      {cloneElement(children, { "aria-describedby": describedBy })}
      {open && typeof document !== "undefined" ? createPortal(
        <span id={id} role="tooltip" style={style} className="aramon-squircle pointer-events-none z-[var(--aramon-layer-popover)] w-max max-w-56 rounded-[10px] border border-[var(--aramon-hairline-strong)] bg-[var(--aramon-frame-raised)] px-3 py-2 text-xs leading-relaxed text-aramon-ink shadow-[var(--aramon-shadow-floating)]">
          {content}
        </span>, document.body,
      ) : null}
    </span>
  );
}
