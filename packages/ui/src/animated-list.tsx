"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "./lib/cn";

export interface AnimatedListProps<T> extends Omit<ComponentPropsWithRef<"ul">, "children"> {
  items: readonly T[];
  getKey(item: T): string;
  renderItem(item: T): ReactNode;
  maxVisible?: number;
  announcement?(itemCount: number): string;
}

export function AnimatedList<T>({ announcement, className, getKey, items, maxVisible = Number.POSITIVE_INFINITY, ref, renderItem, ...props }: AnimatedListProps<T>) {
  const reduceMotion = useReducedMotion();
  const visibleItems = items.slice(0, Math.max(0, maxVisible));
  const previousCount = useRef(items.length);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (previousCount.current !== items.length) {
      setMessage(announcement?.(items.length) ?? `${items.length} items in the list.`);
      previousCount.current = items.length;
    }
  }, [announcement, items.length]);

  return (
    <>
      <ul ref={ref} className={cn("m-0 list-none p-0", className)} {...props}>
        <AnimatePresence initial={false}>
          {visibleItems.map((item) => (
            <motion.li
              layout={reduceMotion ? false : "position"}
              key={getKey(item)}
              initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={reduceMotion ? { duration: 0 } : { duration: .24, ease: [.2, 0, 0, 1] }}
            >
              {renderItem(item)}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <span className="sr-only" aria-live="polite" aria-atomic="true">{message}</span>
    </>
  );
}
