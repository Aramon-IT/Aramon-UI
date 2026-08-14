import type { AnchorHTMLAttributes, HTMLAttributes, LiHTMLAttributes } from "react";
import { cn } from "./lib/cn";

export function Breadcrumb({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Breadcrumb" className={cn("text-xs", className)} {...props} />;
}

export function BreadcrumbList({ className, ...props }: HTMLAttributes<HTMLOListElement>) {
  return <ol className={cn("m-0 flex list-none flex-wrap items-center gap-2 p-0 text-aramon-ink-3", className)} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("inline-flex items-center gap-2", className)} {...props} />;
}

export function BreadcrumbLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn("text-aramon-ink-3 no-underline transition-colors hover:text-aramon-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-[var(--aramon-ink)]", className)} {...props} />;
}

export function BreadcrumbPage({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span aria-current="page" className={cn("font-medium text-aramon-ink", className)} {...props} />;
}

export function BreadcrumbSeparator({ className, children = "›", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span aria-hidden="true" className={cn("font-mono text-[10px] text-aramon-ink-3", className)} {...props}>{children}</span>;
}
