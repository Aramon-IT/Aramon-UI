import type { HTMLAttributes } from "react";
import { cn } from "./lib/cn";

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  decorative?: boolean;
  orientation?: SeparatorOrientation;
}

export function Separator({ className, decorative = true, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <div
      role={decorative ? undefined : "separator"}
      aria-hidden={decorative || undefined}
      aria-orientation={decorative ? undefined : orientation}
      className={cn("shrink-0 bg-[var(--aramon-hairline)]", orientation === "horizontal" ? "h-px w-full" : "h-full min-h-5 w-px", className)}
      {...props}
    />
  );
}
