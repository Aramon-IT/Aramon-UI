"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from "react";
import { mediumDensity, type MediumDensity, type MediumInteraction } from "./core";
import { attachMedium } from "./engine";

export function useMediumPhysics(interaction: MediumInteraction = "stir") {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || interaction === "off") return;
    const controller = attachMedium(element, { interaction });
    return () => controller.destroy();
  }, [interaction]);

  return ref;
}

export interface MediumSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  density?: MediumDensity;
  interaction?: MediumInteraction;
}

export function MediumSurface({
  children,
  className,
  density = "default",
  interaction = "stir",
  style,
  ...props
}: MediumSurfaceProps) {
  const mediumRef = useMediumPhysics(interaction);
  const alpha = mediumDensity[density];
  const mediumStyle = {
    "--aramon-medium-alpha-top": alpha.top,
    "--aramon-medium-alpha-bottom": alpha.bottom,
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={mediumRef}
      className={["aramon-medium", className].filter(Boolean).join(" ")}
      data-aramon-medium={density}
      data-medium-physics={interaction}
      style={mediumStyle}
      {...props}
    >
      <div className="aramon-medium__content">{children}</div>
    </div>
  );
}
