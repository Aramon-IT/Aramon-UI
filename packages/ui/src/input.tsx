import type { HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "./lib/cn";

const controlClass = "min-h-11 w-full rounded-[7px] border border-[var(--aramon-hairline-strong)] bg-[var(--aramon-well)] px-3.5 text-sm text-aramon-ink outline-none transition duration-300 ease-aramon placeholder:text-aramon-ink-3 focus:border-[var(--aramon-ink-2)] focus:bg-aramon-frame focus:ring-4 focus:ring-[var(--aramon-hairline)] disabled:cursor-not-allowed disabled:opacity-45";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlClass, "min-h-28 resize-y py-3", className)} {...props} />;
}

export function FieldLabel({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("grid gap-2 text-xs font-medium text-aramon-ink", className)} {...props} />;
}

export function FieldHint({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("m-0 text-[11px] leading-relaxed text-aramon-ink-3", className)} {...props} />;
}
