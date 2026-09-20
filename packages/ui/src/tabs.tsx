"use client";

import { createContext, useContext, useId, useState, type ComponentPropsWithRef, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "./lib/cn";

interface TabsContextValue {
  baseId: string;
  value: string;
  setValue(value: string): void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Aramon Tabs parts must be placed inside <Tabs>.");
  return context;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  value?: string;
  defaultValue: string;
  onValueChange?(value: string): void;
}

export function Tabs({ className, defaultValue, onValueChange, value: controlledValue, ...props }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const baseId = useId();
  const setValue = (nextValue: string) => {
    if (controlledValue === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <TabsContext.Provider value={{ baseId, value, setValue }}>
      <div className={cn("grid gap-4", className)} {...props} />
    </TabsContext.Provider>
  );
}

export function TabsList({ className, onKeyDown: userOnKeyDown, ref, ...props }: ComponentPropsWithRef<"div">) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    userOnKeyDown?.(event);
    if (event.defaultPrevented) return;
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const tabs = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')];
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (current < 0 || !tabs.length) return;
    event.preventDefault();
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const direction = event.key === "ArrowRight" ? (rtl ? -1 : 1) : (rtl ? 1 : -1);
    const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (current + direction + tabs.length) % tabs.length;
    tabs[next]?.focus();
    tabs[next]?.click();
  };

  return <div ref={ref} role="tablist" className={cn("flex gap-1 border-b border-[var(--aramon-hairline)]", className)} onKeyDown={onKeyDown} {...props} />;
}

export interface TabsTriggerProps extends ComponentPropsWithRef<"button"> {
  value: string;
}

export function TabsTrigger({ className, onClick, ref, value, ...props }: TabsTriggerProps) {
  const context = useTabsContext();
  const active = context.value === value;
  return (
    <button
      type="button"
      ref={ref}
      role="tab"
      id={`${context.baseId}-tab-${value}`}
      aria-controls={`${context.baseId}-panel-${value}`}
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      className={cn("relative min-h-11 px-3 text-xs text-aramon-ink-3 transition hover:text-aramon-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--aramon-focus)] after:absolute after:inset-x-2 after:bottom-[-1px] after:h-px after:origin-center after:scale-x-0 after:bg-[var(--aramon-ink)] after:transition-transform aria-selected:text-aramon-ink aria-selected:after:scale-x-100", className)}
      onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) context.setValue(value); }}
      {...props}
    />
  );
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: ReactNode;
}

export function TabsContent({ className, value, ...props }: TabsContentProps) {
  const context = useTabsContext();
  if (context.value !== value) return null;
  return <div role="tabpanel" id={`${context.baseId}-panel-${value}`} aria-labelledby={`${context.baseId}-tab-${value}`} className={cn("text-sm leading-relaxed text-aramon-ink-2", className)} {...props} />;
}
