import type { HTMLAttributes } from "react";
import { cn } from "./lib/cn";

export interface ProgressTraceProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: string;
}

export function ProgressTrace({ className, value, label = "Progress", ...props }: ProgressTraceProps) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <div className="flex justify-between text-[10px] font-medium uppercase tracking-[.12em] text-aramon-ink-3">
        <span>{label}</span><span>{Math.round(safeValue)}%</span>
      </div>
      <div className="h-px overflow-visible bg-[var(--aramon-hairline-strong)]" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue}>
        <div className="relative h-px bg-[var(--aramon-ink)] transition-[width] duration-500 ease-aramon" style={{ width: `${safeValue}%` }}>
          <i aria-hidden="true" className="absolute -end-0.5 -top-0.5 size-1 rounded-full bg-[var(--aramon-ink)]" />
        </div>
      </div>
    </div>
  );
}
