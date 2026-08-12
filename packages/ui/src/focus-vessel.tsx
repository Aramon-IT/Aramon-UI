"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { MediumSurface } from "@aramon/medium/react";
import { cn } from "./lib/cn";

export interface FocusVesselProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  metric?: string;
  action?: ReactNode;
}

export function FocusVessel({ action, children, className, eyebrow = "FOCUS VESSEL", metric, title, ...props }: FocusVesselProps) {
  return (
    <MediumSurface density="focus" interaction="stir" className={cn("min-h-72 p-6", className)} {...props}>
      <div className="flex h-full min-h-60 flex-col">
        <span className="text-[9px] font-medium tracking-[.14em] text-[rgba(255,255,255,.62)]">{eyebrow}</span>
        <div className="my-auto py-8">
          {metric ? <strong className="block font-mono text-5xl font-light tracking-[-.08em]">{metric}</strong> : null}
          <h3 className="mt-3 font-serif text-2xl font-normal tracking-[-.03em]">{title}</h3>
          {children ? <div className="mt-2 text-xs leading-relaxed text-[rgba(255,255,255,.76)] drop-shadow-[0_1px_4px_rgba(0,0,0,.55)]">{children}</div> : null}
        </div>
        {action ? <div className="self-end">{action}</div> : null}
      </div>
    </MediumSurface>
  );
}
