import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/cn";

export type TooltipSide = "top" | "right" | "bottom";

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, "content"> {
  content: ReactNode;
  side?: TooltipSide;
}

const sideClasses: Record<TooltipSide, string> = {
  top: "bottom-[calc(100%+.6rem)] left-1/2 -translate-x-1/2 group-hover:-translate-y-0.5 group-focus-within:-translate-y-0.5",
  right: "left-[calc(100%+.6rem)] top-1/2 -translate-y-1/2 group-hover:translate-x-0.5 group-focus-within:translate-x-0.5",
  bottom: "left-1/2 top-[calc(100%+.6rem)] -translate-x-1/2 group-hover:translate-y-0.5 group-focus-within:translate-y-0.5",
};

export function Tooltip({ children, className, content, side = "top", ...props }: TooltipProps) {
  return (
    <span className={cn("aramon-tooltip group relative inline-flex", className)} {...props}>
      {children}
      <span role="tooltip" className={cn("aramon-tooltip__content pointer-events-none absolute z-50 hidden w-max max-w-56 rounded-[5px] border border-[var(--aramon-hairline-strong)] bg-[color-mix(in_srgb,var(--aramon-desk-deep)_92%,transparent)] px-2.5 py-1.5 text-[10px] leading-relaxed text-aramon-ink opacity-0 shadow-xl backdrop-blur-xl transition duration-200 group-hover:block group-hover:opacity-100 group-focus-within:block group-focus-within:opacity-100", sideClasses[side])}>{content}</span>
    </span>
  );
}
