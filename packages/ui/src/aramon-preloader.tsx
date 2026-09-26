"use client";

import { useEffect, useRef, useState, type ComponentPropsWithRef } from "react";
import { cn } from "./lib/cn";

export interface AramonPreloaderProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
  src: string;
  poster: string;
  ready?: boolean;
  minimumDuration?: number;
  onComplete?: () => void;
}

export function AramonPreloader({ className, onComplete, poster, ready = false, src, minimumDuration = 900, ref, ...props }: AramonPreloaderProps) {
  const startedAt = useRef(Date.now());
  const [exiting, setExiting] = useState(false);
  const [complete, setComplete] = useState(false);
  const [usePoster, setUsePoster] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    setUsePoster(reduceMotion || saveData);
  }, [onComplete]);

  const finish = () => {
    if (exiting || complete) return;
    const wait = Math.max(0, minimumDuration - (Date.now() - startedAt.current));
    window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(() => { setComplete(true); onComplete?.(); }, 420);
    }, wait);
  };

  useEffect(() => {
    if (ready) finish();
  }, [ready]);

  if (complete) return null;
  return <div ref={ref} role="status" aria-label="Loading Aramon" className={cn("aramon-preloader", exiting && "aramon-preloader-exiting", className)} {...props}>
    {usePoster ? <img src={poster} alt="" aria-hidden="true" /> : <video autoPlay muted playsInline loop preload="auto" poster={poster} aria-hidden="true"><source src={src} type="video/mp4" /></video>}
    <span className="sr-only">Loading</span>
  </div>;
}
