"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "./lib/cn";

export type BlurOutUpTrigger = "mount" | "viewport" | "controlled";

export interface BlurOutUpProps extends Omit<HTMLMotionProps<"span">, "children"> {
  children: string;
  trigger?: BlurOutUpTrigger;
  active?: boolean;
  maxStaggeredWords?: number;
}

export function BlurOutUp({ active = true, children, className, maxStaggeredWords = 12, ref, trigger = "mount", ...props }: BlurOutUpProps) {
  const reduceMotion = useReducedMotion();
  const words = children.split(/(\s+)/).filter(Boolean);
  const hidden = { opacity: 0, y: 10, filter: "blur(6px)" };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };
  const viewportProps = trigger === "viewport" ? { whileInView: "shown", viewport: { once: true, amount: .6 } } : {};
  return (
    <motion.span ref={ref} className={cn("inline", className)} aria-label={children} initial={reduceMotion ? false : "hidden"} animate={trigger === "controlled" ? (active ? "shown" : "hidden") : trigger === "mount" ? "shown" : undefined} variants={{ hidden, shown }} {...viewportProps} {...props}>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <motion.span key={`${word}-${index}`} className="inline-block whitespace-pre" variants={{ hidden, shown }} transition={reduceMotion ? { duration: 0 } : { duration: .42, delay: Math.min(index, maxStaggeredWords) * .028, ease: [.22, 1, .36, 1] }}>
            {word}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
