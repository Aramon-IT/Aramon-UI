import type { ComponentPropsWithRef } from "react";
import { cn } from "./lib/cn";

export interface CheckboxProps extends Omit<ComponentPropsWithRef<"input">, "type"> {
  label: string;
  description?: string;
}

export function Checkbox({ className, label, description, ref, ...props }: CheckboxProps) {
  return (
    <label className={cn("group flex cursor-pointer items-start gap-3 text-sm text-aramon-ink", className)}>
      <input
        type="checkbox"
        ref={ref}
        className="aramon-squircle peer mt-0.5 size-5 shrink-0 appearance-none rounded-[6px] border border-[var(--aramon-hairline-strong)] bg-[var(--aramon-well)] transition checked:border-[var(--aramon-ink)] checked:bg-[var(--aramon-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--aramon-focus)] after:block after:h-2 after:w-1 after:translate-x-[7px] after:translate-y-[3px] after:rotate-45 after:border-b after:border-r after:border-[var(--aramon-desk)] after:opacity-0 checked:after:opacity-100"
        {...props}
      />
      <span>
        <span className="block leading-5">{label}</span>
        {description ? <span className="mt-0.5 block text-xs leading-relaxed text-aramon-ink-3">{description}</span> : null}
      </span>
    </label>
  );
}
