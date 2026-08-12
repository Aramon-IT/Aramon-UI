import type { HTMLAttributes } from "react";
import { cn } from "./lib/cn";

export type BadgeTone = "neutral" | "positive" | "attention" | "critical";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: "border-[var(--aramon-hairline-strong)] bg-[var(--aramon-well)] text-aramon-ink-2",
  positive: "border-[color-mix(in_srgb,var(--aramon-success)_38%,transparent)] bg-[color-mix(in_srgb,var(--aramon-success)_11%,transparent)] text-[var(--aramon-success)]",
  attention: "border-[color-mix(in_srgb,var(--aramon-attention)_38%,transparent)] bg-[color-mix(in_srgb,var(--aramon-attention)_11%,transparent)] text-[var(--aramon-attention)]",
  critical: "border-[color-mix(in_srgb,var(--aramon-critical)_38%,transparent)] bg-[color-mix(in_srgb,var(--aramon-critical)_11%,transparent)] text-[var(--aramon-critical)]",
};

export function Badge({ children, className, dot = false, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span className={cn("inline-flex min-h-6 items-center gap-1.5 rounded-full border px-2.5 font-mono text-[9px] font-medium uppercase tracking-[.08em]", toneClasses[tone], className)} {...props}>
      {dot ? <i aria-hidden="true" className="size-1 rounded-full bg-current shadow-[0_0_8px_currentColor]" /> : null}
      {children}
    </span>
  );
}
