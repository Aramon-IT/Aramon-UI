import type { HTMLAttributes, ImgHTMLAttributes } from "react";
import { cn } from "./lib/cn";

export type AvatarSize = "small" | "default" | "large";
export type Presence = "online" | "away" | "busy" | "offline";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  alt: string;
  fallback: string;
  presence?: Presence;
  size?: AvatarSize;
  src?: ImgHTMLAttributes<HTMLImageElement>["src"];
}

const sizes: Record<AvatarSize, string> = {
  small: "size-8 text-[9px]",
  default: "size-11 text-xs",
  large: "size-16 text-base",
};

const presenceColors: Record<Presence, string> = {
  online: "bg-[var(--aramon-success)]",
  away: "bg-[var(--aramon-attention)]",
  busy: "bg-[var(--aramon-critical)]",
  offline: "bg-aramon-ink-3",
};

export function Avatar({ alt, className, fallback, presence, size = "default", src, ...props }: AvatarProps) {
  return (
    <span className={cn("relative inline-grid shrink-0 place-items-center rounded-full border border-[var(--aramon-hairline-strong)] bg-[var(--aramon-well)] font-mono text-aramon-ink-2", sizes[size], className)} {...props}>
      {src ? <img src={src} alt={alt} className="size-full rounded-[inherit] object-cover" /> : <span aria-label={alt}>{fallback.slice(0, 2).toUpperCase()}</span>}
      {presence ? <i aria-label={presence} className={cn("absolute bottom-0 right-0 size-[22%] min-h-2 min-w-2 rounded-full ring-2 ring-[var(--aramon-desk)]", presenceColors[presence])} /> : null}
    </span>
  );
}
