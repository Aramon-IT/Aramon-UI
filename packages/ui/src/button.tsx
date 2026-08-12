import type { ButtonHTMLAttributes } from "react";
import { cn } from "./lib/cn";

export type ButtonEnergy = "lamp" | "reflective" | "quiet" | "critical";
export type ButtonSize = "compact" | "default" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  energy?: ButtonEnergy;
  size?: ButtonSize;
}

const energyClasses: Record<ButtonEnergy, string> = {
  lamp: "aramon-lamp font-semibold hover:-translate-y-0.5 hover:brightness-[1.04] data-[demo-state=hover]:-translate-y-0.5 data-[demo-state=hover]:brightness-[1.04]",
  reflective:
    "border border-[var(--aramon-hairline-strong)] bg-aramon-frame text-aramon-ink backdrop-blur-md hover:-translate-y-0.5 hover:border-[var(--aramon-ink-3)] hover:bg-[var(--aramon-well)] data-[demo-state=hover]:-translate-y-0.5 data-[demo-state=hover]:border-[var(--aramon-ink-3)] data-[demo-state=hover]:bg-[var(--aramon-well)]",
  quiet: "border-transparent bg-transparent text-aramon-ink-2 hover:bg-[var(--aramon-well)] hover:text-aramon-ink data-[demo-state=hover]:bg-[var(--aramon-well)] data-[demo-state=hover]:text-aramon-ink",
  critical:
    "border border-[color-mix(in_srgb,var(--aramon-critical)_54%,transparent)] bg-[color-mix(in_srgb,var(--aramon-critical)_14%,transparent)] text-[var(--aramon-critical)] hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--aramon-critical)_21%,transparent)] data-[demo-state=hover]:-translate-y-0.5 data-[demo-state=hover]:bg-[color-mix(in_srgb,var(--aramon-critical)_21%,transparent)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  compact: "min-h-9 px-3.5 text-xs",
  default: "min-h-11 px-5 text-sm",
  icon: "size-11 shrink-0 p-0",
};

export function buttonClasses({ className, energy = "reflective", size = "default" }: Pick<ButtonProps, "className" | "energy" | "size"> = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-[6px] border no-underline transition-[transform,background-color,border-color,color,box-shadow,filter,opacity] duration-300 ease-aramon focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--aramon-lamp-top)] active:scale-[.975] data-[demo-state=focus]:outline data-[demo-state=focus]:outline-1 data-[demo-state=focus]:outline-offset-4 data-[demo-state=focus]:outline-[var(--aramon-ink)] data-[demo-state=active]:scale-[.975] disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-40",
    energyClasses[energy],
    sizeClasses[size],
    className,
  );
}

export function Button({ className, energy = "reflective", size = "default", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ className, energy, size })}
      {...props}
    />
  );
}
