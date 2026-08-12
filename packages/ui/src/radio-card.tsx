import type { InputHTMLAttributes } from "react";
import { cn } from "./lib/cn";

export interface RadioCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  description?: string;
  label: string;
  meta?: string;
}

export function RadioCard({ className, description, label, meta, ...props }: RadioCardProps) {
  return (
    <label className={cn("group relative grid min-h-28 cursor-pointer content-between gap-5 rounded-[2px_2px_10px_10px] border border-[var(--aramon-hairline-strong)] bg-aramon-frame p-4 text-aramon-ink transition duration-300 hover:-translate-y-0.5 hover:border-[var(--aramon-ink-3)] has-[:checked]:border-[var(--aramon-ink)] has-[:checked]:shadow-[inset_0_1px_0_var(--aramon-hairline-strong)] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-[var(--aramon-hairline)] has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-45", className)}>
      <input type="radio" className="sr-only" {...props} />
      <span className="flex items-start justify-between gap-4">
        <span className="text-sm font-medium">{label}</span>
        <i aria-hidden="true" className="mt-0.5 size-3 rounded-full border border-[var(--aramon-hairline-strong)] p-0.5 transition group-has-[:checked]:border-[var(--aramon-ink)] group-has-[:checked]:bg-[var(--aramon-ink)] group-has-[:checked]:shadow-[inset_0_0_0_2px_var(--aramon-desk)]" />
      </span>
      <span>
        {description ? <span className="block text-xs leading-relaxed text-aramon-ink-3">{description}</span> : null}
        {meta ? <span className="mt-2 block font-mono text-[8px] uppercase tracking-[.1em] text-aramon-ink-3">{meta}</span> : null}
      </span>
    </label>
  );
}
