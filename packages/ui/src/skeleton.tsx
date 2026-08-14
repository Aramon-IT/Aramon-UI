import type { HTMLAttributes } from "react";
import { cn } from "./lib/cn";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-[5px] bg-[color-mix(in_srgb,var(--aramon-ink)_9%,transparent)] motion-reduce:animate-none", className)} {...props} />;
}

export interface SkeletonTextProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
}

export function SkeletonText({ className, lines = 3, ...props }: SkeletonTextProps) {
  const safeLines = Math.max(1, Math.min(8, Math.round(lines)));
  return (
    <div aria-hidden="true" className={cn("grid gap-2.5", className)} {...props}>
      {Array.from({ length: safeLines }, (_, index) => <Skeleton key={index} className={cn("h-2.5", index === safeLines - 1 ? "w-3/5" : "w-full")} />)}
    </div>
  );
}
