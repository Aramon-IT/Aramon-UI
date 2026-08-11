export const aramonTokens = {
  radius: {
    edge: "2px",
    control: "6px",
    frame: "12px",
    medium: "18px",
  },
  space: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    6: "24px",
    8: "32px",
    12: "48px",
    16: "64px",
    24: "96px",
  },
  motion: {
    instant: "160ms",
    control: "320ms",
    enter: "520ms",
    measure: "800ms",
    materialEase: "cubic-bezier(.22, 1, .36, 1)",
  },
  physics: {
    cell: 10,
    wave: 0.42,
    velocityDamp: 0.968,
    heightDamp: 0.984,
    smooth: 0.14,
    supersample: 2,
    blurPasses: 2,
    gain: 1.5,
  },
} as const;

export type AramonTokens = typeof aramonTokens;
