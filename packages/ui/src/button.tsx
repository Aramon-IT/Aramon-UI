import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "./lib/cn";

export type ButtonEnergy = "lamp" | "reflective" | "quiet" | "critical";
export type ButtonSize = "compact" | "default" | "icon";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  energy?: ButtonEnergy;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: ReactNode;
}

const energyClasses: Record<ButtonEnergy, string> = {
  lamp: "aramon-lamp font-semibold hover:bg-[var(--aramon-lamp-hover)] data-[demo-state=hover]:bg-[var(--aramon-lamp-hover)]",
  reflective: "border-[var(--aramon-hairline-strong)] bg-aramon-frame text-aramon-ink hover:bg-[var(--aramon-control)] data-[demo-state=hover]:bg-[var(--aramon-control)]",
  quiet: "border-transparent bg-transparent text-aramon-ink-2 hover:bg-[var(--aramon-control)] hover:text-aramon-ink data-[demo-state=hover]:bg-[var(--aramon-control)] data-[demo-state=hover]:text-aramon-ink",
  critical: "border-[color-mix(in_srgb,var(--aramon-critical)_45%,transparent)] bg-[color-mix(in_srgb,var(--aramon-critical)_10%,transparent)] text-[var(--aramon-critical)] hover:bg-[color-mix(in_srgb,var(--aramon-critical)_16%,transparent)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  compact: "min-h-11 px-3.5 text-xs",
  default: "min-h-11 px-[18px] text-sm",
  icon: "size-11 shrink-0 p-0",
};

export function buttonClasses({ className, energy = "reflective", size = "default" }: Pick<ButtonProps, "className" | "energy" | "size"> = {}) {
  return cn(
    "aramon-squircle inline-flex items-center justify-center gap-2 rounded-[var(--aramon-radius-control)] border no-underline transition-[transform,background-color,border-color,color,opacity] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--aramon-focus)] active:scale-[.98] data-[demo-state=focus]:outline data-[demo-state=focus]:outline-2 data-[demo-state=focus]:outline-offset-[3px] data-[demo-state=focus]:outline-[var(--aramon-focus)] data-[demo-state=active]:scale-[.98] disabled:pointer-events-none disabled:opacity-45",
    energyClasses[energy], sizeClasses[size], className,
  );
}

export function Button({ children, className, disabled, energy = "reflective", loading = false, loadingText, ref, size = "default", type = "button", ...props }: ButtonProps) {
  return (
    <button ref={ref} type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={buttonClasses({ className, energy, size })} {...props}>
      {loading ? <><span aria-hidden="true" className="size-3 animate-pulse rounded-full bg-current opacity-55" />{loadingText ?? children}</> : children}
    </button>
  );
}
