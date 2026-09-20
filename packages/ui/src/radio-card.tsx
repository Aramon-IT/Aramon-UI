import type { ComponentPropsWithRef } from "react";
import { cn } from "./lib/cn";

export interface RadioCardProps extends Omit<ComponentPropsWithRef<"input">, "type"> {
  description?: string;
  label: string;
  meta?: string;
}

export function RadioCard({ className, description, label, meta, ref, ...props }: RadioCardProps) {
  return (
    <label className={cn("aramon-squircle group relative grid min-h-28 cursor-pointer content-between gap-5 rounded-[var(--aramon-radius-control)] border border-[var(--aramon-hairline-strong)] bg-aramon-frame p-4 text-aramon-ink transition duration-200 hover:border-[var(--aramon-ink-3)] has-[:checked]:border-[var(--aramon-ink)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[color-mix(in_srgb,var(--aramon-focus)_18%,transparent)] has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-45", className)}>
      <input ref={ref} type="radio" className="sr-only" {...props} />
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
