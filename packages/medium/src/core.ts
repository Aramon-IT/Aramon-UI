export type MediumInteraction = "stir" | "press" | "off";
export type MediumDensity = "choice" | "default" | "focus" | "dialog";

export interface MediumPhysicsOptions {
  interaction?: MediumInteraction;
  maxActive?: number;
}

export const mediumDensity = {
  choice: { top: 0.38, bottom: 0.56 },
  default: { top: 0.5, bottom: 0.68 },
  focus: { top: 0.57, bottom: 0.74 },
  dialog: { top: 0.42, bottom: 0.56 },
} as const satisfies Record<MediumDensity, { top: number; bottom: number }>;
