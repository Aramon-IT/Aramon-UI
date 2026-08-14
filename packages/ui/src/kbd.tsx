import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/cn";

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <kbd className={cn("inline-flex min-h-6 min-w-6 items-center justify-center rounded-[4px] border border-[var(--aramon-hairline-strong)] bg-[var(--aramon-well)] px-1.5 font-mono text-[9px] font-medium text-aramon-ink-2 shadow-[inset_0_1px_0_var(--aramon-hairline)]", className)} {...props} />;
}

export interface KeySequenceProps extends HTMLAttributes<HTMLSpanElement> {
  keys: ReactNode[];
}

export function KeySequence({ className, keys, ...props }: KeySequenceProps) {
  return <span className={cn("inline-flex items-center gap-1", className)} {...props}>{keys.map((key, index) => <Kbd key={index}>{key}</Kbd>)}</span>;
}
