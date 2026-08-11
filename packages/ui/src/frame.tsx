import type { HTMLAttributes } from "react";
import { cn } from "./lib/cn";

export function Frame({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("aramon-frame", className)} {...props} />;
}
