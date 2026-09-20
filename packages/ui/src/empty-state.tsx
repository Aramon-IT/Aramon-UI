import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/cn";

export interface EmptyStateProps extends HTMLAttributes<HTMLElement> {
  action?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  title: string;
}

export function EmptyState({ action, children, className, description, icon, title, ...props }: EmptyStateProps) {
  return (
    <section className={cn("grid min-h-64 place-items-center border-y border-[var(--aramon-hairline)] px-6 py-12 text-center", className)} {...props}>
      <div className="max-w-sm">
        {icon ? <div aria-hidden="true" className="aramon-squircle mx-auto mb-5 grid size-11 place-items-center rounded-[12px] border border-[var(--aramon-hairline-strong)] bg-[var(--aramon-well)] text-aramon-ink-2">{icon}</div> : null}
        <h3 className="m-0 text-2xl font-semibold tracking-[-.035em] text-aramon-ink">{title}</h3>
        {description ? <div className="mx-auto mt-2 max-w-[34ch] text-xs leading-relaxed text-aramon-ink-3">{description}</div> : null}
        {children ? <div className="mt-4 text-xs text-aramon-ink-2">{children}</div> : null}
        {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
      </div>
    </section>
  );
}
