import type { ButtonHTMLAttributes } from "react";
import { cn } from "./lib/cn";

export type ButtonEnergy = "lamp" | "reflective" | "quiet";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  energy?: ButtonEnergy;
}

const energyClasses: Record<ButtonEnergy, string> = {
  lamp: "aramon-lamp font-semibold hover:-translate-y-0.5 hover:brightness-[1.04] data-[demo-state=hover]:-translate-y-0.5 data-[demo-state=hover]:brightness-[1.04]",
  reflective:
    "border border-[var(--aramon-hairline-strong)] bg-aramon-frame text-aramon-ink backdrop-blur-md hover:-translate-y-0.5 hover:border-[var(--aramon-ink-3)] hover:bg-[var(--aramon-well)] data-[demo-state=hover]:-translate-y-0.5 data-[demo-state=hover]:border-[var(--aramon-ink-3)] data-[demo-state=hover]:bg-[var(--aramon-well)]",
  quiet: "border-transparent bg-transparent text-aramon-ink-2 hover:bg-[var(--aramon-well)] hover:text-aramon-ink data-[demo-state=hover]:bg-[var(--aramon-well)] data-[demo-state=hover]:text-aramon-ink",
};

export function buttonClasses({ className, energy = "reflective" }: Pick<ButtonProps, "className" | "energy"> = {}) {
  return cn(
    "inline-flex min-h-11 items-center justify-center rounded-[6px] border px-5 text-sm no-underline transition-[transform,background-color,border-color,color,box-shadow,filter,opacity] duration-300 ease-aramon focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--aramon-lamp-top)] active:scale-[.975] data-[demo-state=focus]:outline data-[demo-state=focus]:outline-1 data-[demo-state=focus]:outline-offset-4 data-[demo-state=focus]:outline-[var(--aramon-ink)] data-[demo-state=active]:scale-[.975] disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-40",
    energyClasses[energy],
    className,
  );
}

export function Button({ className, energy = "reflective", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ className, energy })}
      {...props}
    />
  );
}
