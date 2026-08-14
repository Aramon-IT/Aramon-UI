export type MediumInteraction = "stir" | "press" | "off";
export type MediumDensity = "choice" | "default" | "focus" | "dialog";

export interface MediumPhysicsOptions {
  interaction?: MediumInteraction;
  maxActive?: number;
}

/**
 * Live Medium is a scarce product resource, not a general surface treatment.
 * One persistent signature vessel may animate, with one transient overlay allowed.
 */
export const MEDIUM_PERFORMANCE_BUDGET = {
  persistent: 1,
  transient: 1,
  maxActive: 2,
} as const;

export const mediumDensity = {
  choice: { top: 0.3, bottom: 0.44 },
  default: { top: 0.38, bottom: 0.52 },
  focus: { top: 0.43, bottom: 0.57 },
  dialog: { top: 0.3, bottom: 0.42 },
} as const satisfies Record<MediumDensity, { top: number; bottom: number }>;
