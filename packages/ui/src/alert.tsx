import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/cn";

export type AlertTone = "info" | "positive" | "attention" | "critical";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  action?: ReactNode;
  title: string;
  tone?: AlertTone;
}

const tones: Record<AlertTone, string> = {
  info: "border-[color-mix(in_srgb,var(--aramon-signal)_34%,transparent)] before:bg-[var(--aramon-signal)]",
  positive: "border-[color-mix(in_srgb,var(--aramon-success)_34%,transparent)] before:bg-[var(--aramon-success)]",
  attention: "border-[color-mix(in_srgb,var(--aramon-attention)_34%,transparent)] before:bg-[var(--aramon-attention)]",
  critical: "border-[color-mix(in_srgb,var(--aramon-critical)_34%,transparent)] before:bg-[var(--aramon-critical)]",
};

export function Alert({ action, children, className, title, tone = "info", ...props }: AlertProps) {
  return (
    <div role={tone === "critical" ? "alert" : "status"} className={cn("relative grid min-h-20 grid-cols-[1fr_auto] items-center gap-5 overflow-hidden rounded-[2px_2px_10px_10px] border bg-aramon-frame px-5 py-4 text-aramon-ink before:absolute before:inset-y-0 before:left-0 before:w-px", tones[tone], className)} {...props}>
      <div>
        <strong className="block text-sm font-medium">{title}</strong>
        {children ? <div className="mt-1 text-xs leading-relaxed text-aramon-ink-3">{children}</div> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
