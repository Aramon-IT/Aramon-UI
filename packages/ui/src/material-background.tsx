"use client";

import { useEffect, useRef, useState, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "./lib/cn";

export interface MaterialBackgroundSource {
  src: string;
  type: "video/webm" | "video/mp4";
}

export interface MaterialBackgroundProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
  sources: readonly MaterialBackgroundSource[];
  poster: string;
  children?: ReactNode;
  scrim?: string;
  videoClassName?: string;
}

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

export function MaterialBackground({ children, className, poster, ref, scrim = "linear-gradient(180deg, rgb(0 0 0 / .08), rgb(0 0 0 / .52))", sources, videoClassName, ...props }: MaterialBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [usePoster, setUsePoster] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
    setUsePoster(reduceMotion || saveData);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || usePoster) return;
    const sync = () => document.hidden ? video.pause() : void video.play().catch(() => undefined);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => document.removeEventListener("visibilitychange", sync);
  }, [usePoster]);

  return (
    <div ref={ref} className={cn("aramon-squircle relative isolate overflow-hidden rounded-[var(--aramon-radius-feature)] bg-black", className)} {...props}>
      {usePoster ? <img src={poster} alt="" className={cn("absolute inset-0 size-full object-cover", videoClassName)} /> : (
        <video ref={videoRef} muted playsInline loop autoPlay poster={poster} preload="metadata" aria-hidden="true" className={cn("absolute inset-0 size-full object-cover", videoClassName)}>
          {sources.map((source) => <source key={source.src} src={source.src} type={source.type} />)}
        </video>
      )}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: scrim }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
