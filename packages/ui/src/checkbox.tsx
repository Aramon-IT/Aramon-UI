import type { InputHTMLAttributes } from "react";
import { cn } from "./lib/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

export function Checkbox({ className, label, description, ...props }: CheckboxProps) {
  return (
    <label className={cn("group flex cursor-pointer items-start gap-3 text-sm text-aramon-ink", className)}>
      <input
        type="checkbox"
        className="peer mt-0.5 size-4 shrink-0 appearance-none rounded-[4px] border border-[var(--aramon-hairline-strong)] bg-[var(--aramon-well)] transition checked:border-[var(--aramon-ink)] checked:bg-[var(--aramon-ink)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-[var(--aramon-ink)] after:block after:h-2 after:w-1 after:translate-x-[5px] after:translate-y-[2px] after:rotate-45 after:border-b after:border-r after:border-[var(--aramon-desk)] after:opacity-0 checked:after:opacity-100"
        {...props}
      />
      <span>
        <span className="block leading-5">{label}</span>
        {description ? <span className="mt-0.5 block text-xs leading-relaxed text-aramon-ink-3">{description}</span> : null}
      </span>
    </label>
  );
}
