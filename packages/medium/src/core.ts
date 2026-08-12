export type MediumInteraction = "stir" | "press" | "off";
export type MediumDensity = "choice" | "default" | "focus" | "dialog";

export interface MediumPhysicsOptions {
  interaction?: MediumInteraction;
  maxActive?: number;
}

export const mediumDensity = {
  choice: { top: 0.3, bottom: 0.44 },
  default: { top: 0.38, bottom: 0.52 },
  focus: { top: 0.43, bottom: 0.57 },
  dialog: { top: 0.3, bottom: 0.42 },
} as const satisfies Record<MediumDensity, { top: number; bottom: number }>;
