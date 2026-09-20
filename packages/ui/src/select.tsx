import type { ComponentPropsWithRef } from "react";
import { controlClass } from "./input";
import { cn } from "./lib/cn";

export function Select({ children, className, ref, ...props }: ComponentPropsWithRef<"select">) {
  return (
    <span className="relative block">
      <select ref={ref} className={cn(controlClass, "appearance-none pe-10", className)} {...props}>{children}</select>
      <span aria-hidden="true" className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-aramon-ink-3">⌄</span>
    </span>
  );
}
