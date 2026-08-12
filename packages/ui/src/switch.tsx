import type { InputHTMLAttributes } from "react";
import { cn } from "./lib/cn";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  description?: string;
  label: string;
}

export function Switch({ className, description, label, ...props }: SwitchProps) {
  return (
    <label className={cn("group flex cursor-pointer items-start justify-between gap-4 text-sm text-aramon-ink has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-45", className)}>
      <span>
        <span className="block leading-5">{label}</span>
        {description ? <span className="mt-0.5 block text-xs leading-relaxed text-aramon-ink-3">{description}</span> : null}
      </span>
      <span className="relative mt-0.5 shrink-0">
        <input type="checkbox" role="switch" className="peer sr-only" {...props} />
        <span aria-hidden="true" className="block h-6 w-10 rounded-full border border-[var(--aramon-hairline-strong)] bg-[var(--aramon-well)] transition-[background-color,border-color,box-shadow] duration-300 peer-checked:border-[var(--aramon-ink)] peer-checked:bg-[var(--aramon-ink)] peer-focus-visible:ring-4 peer-focus-visible:ring-[var(--aramon-hairline-strong)]" />
        <span aria-hidden="true" className="absolute left-1 top-1 size-4 rounded-full bg-aramon-ink-3 shadow-sm transition-transform duration-300 ease-aramon peer-checked:translate-x-4 peer-checked:bg-[var(--aramon-desk)]" />
      </span>
    </label>
  );
}
