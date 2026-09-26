"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AramonPreloader } from "@aramon/ui/aramon-preloader";

export function SitePreloader() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;
    const finish = () => window.setTimeout(() => setReady(true), 220);
    if (document.readyState === "complete") {
      finish();
      return () => undefined;
    }
    window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, [pathname]);

  if (pathname !== "/" || complete) return null;
  return <div className="site-preloader"><AramonPreloader className="site-preloader-media" src="/aramon/brand/preloader/preloading.mp4" poster="/aramon/brand/preloader/preloading-poster.jpg" ready={ready} minimumDuration={900} onComplete={() => setComplete(true)} /></div>;
}
