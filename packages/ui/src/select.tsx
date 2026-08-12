import type { SelectHTMLAttributes } from "react";
import { controlClass } from "./input";
import { cn } from "./lib/cn";

export function Select({ children, className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="relative block">
      <select className={cn(controlClass, "appearance-none pr-10", className)} {...props}>{children}</select>
      <span aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-aramon-ink-3">⌄</span>
    </span>
  );
}
