import type { ComponentPropsWithRef } from "react";
import { cn } from "./lib/cn";

export interface SwitchProps extends Omit<ComponentPropsWithRef<"input">, "size" | "type"> {
  description?: string;
  label: string;
}

export function Switch({ className, description, label, ref, ...props }: SwitchProps) {
  return (
    <label className={cn("group flex cursor-pointer items-start justify-between gap-4 text-sm text-aramon-ink has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-45", className)}>
      <span>
        <span className="block leading-5">{label}</span>
        {description ? <span className="mt-0.5 block text-xs leading-relaxed text-aramon-ink-3">{description}</span> : null}
      </span>
      <span className="relative mt-0.5 shrink-0">
        <input ref={ref} type="checkbox" role="switch" className="peer sr-only" {...props} />
        <span aria-hidden="true" className="aramon-squircle block h-6 w-10 rounded-[9px] border border-[var(--aramon-hairline-strong)] bg-[var(--aramon-well)] transition-[background-color,border-color,box-shadow] duration-200 peer-checked:border-[var(--aramon-ink)] peer-checked:bg-[var(--aramon-ink)] peer-focus-visible:ring-2 peer-focus-visible:ring-[color-mix(in_srgb,var(--aramon-focus)_18%,transparent)]" />
        <span aria-hidden="true" className="aramon-squircle absolute start-1 top-1 size-4 rounded-[6px] bg-aramon-ink-3 transition-transform duration-200 ease-out peer-checked:translate-x-4 peer-checked:bg-[var(--aramon-desk)] rtl:peer-checked:-translate-x-4" />
      </span>
    </label>
  );
}
