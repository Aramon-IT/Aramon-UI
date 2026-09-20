import type { ComponentPropsWithRef, HTMLAttributes, LabelHTMLAttributes } from "react";
import { cn } from "./lib/cn";

export const controlClass = "aramon-control min-h-11 w-full rounded-[var(--aramon-radius-control)] border border-[var(--aramon-hairline-strong)] bg-[var(--aramon-control)] px-3.5 text-base text-aramon-ink outline-none transition-[background-color,border-color,box-shadow] duration-200 placeholder:text-aramon-ink-3 focus:border-[var(--aramon-ink)] focus:bg-aramon-frame focus:ring-2 focus:ring-[color-mix(in_srgb,var(--aramon-focus)_18%,transparent)] aria-[invalid=true]:border-[var(--aramon-critical)] aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[color-mix(in_srgb,var(--aramon-critical)_14%,transparent)] disabled:cursor-not-allowed disabled:opacity-45 sm:text-sm";

export function Input({ className, ref, ...props }: ComponentPropsWithRef<"input">) {
  return <input ref={ref} className={cn(controlClass, className)} {...props} />;
}

export function Textarea({ className, ref, ...props }: ComponentPropsWithRef<"textarea">) {
  return <textarea ref={ref} className={cn(controlClass, "min-h-28 resize-y py-3", className)} {...props} />;
}

export function FieldLabel({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("grid gap-2 text-[13px] font-semibold text-aramon-ink", className)} {...props} />;
}

export function FieldHint({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("m-0 text-xs leading-relaxed text-aramon-ink-2", className)} {...props} />;
}

export function FieldError({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p role="alert" className={cn("m-0 text-xs leading-relaxed text-[var(--aramon-critical)]", className)} {...props} />;
}
