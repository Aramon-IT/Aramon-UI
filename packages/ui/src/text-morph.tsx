"use client";

import { AnimatePresence, motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "./lib/cn";

export interface TextMorphProps extends Omit<HTMLMotionProps<"span">, "children"> {
  children: string;
  by?: "word" | "character";
}

function tokensFor(value: string, by: "word" | "character") {
  if (by === "character") return Array.from(value);
  return value.split(/(\s+)/).filter(Boolean);
}

export function TextMorph({ by = "word", children, className, ref, ...props }: TextMorphProps) {
  const reduceMotion = useReducedMotion();
  const tokens = tokensFor(children, by);
  const occurrences = new Map<string, number>();
  return (
    <motion.span ref={ref} layout={!reduceMotion} className={cn("relative inline-flex w-fit whitespace-pre", className)} aria-label={children} {...props}>
      <span aria-hidden="true" className="inline-flex">
        <AnimatePresence initial={false} mode="popLayout">
          {tokens.map((token) => {
            const occurrence = occurrences.get(token) ?? 0;
            occurrences.set(token, occurrence + 1);
            return (
              <motion.span key={`${token}-${occurrence}`} layout={!reduceMotion} initial={reduceMotion ? false : { opacity: 0, y: 6, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, filter: "blur(4px)" }} transition={reduceMotion ? { duration: 0 } : { duration: .2 }}>
                {token}
              </motion.span>
            );
          })}
        </AnimatePresence>
      </span>
    </motion.span>
  );
}
