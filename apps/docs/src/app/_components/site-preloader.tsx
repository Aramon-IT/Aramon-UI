"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AramonPreloader } from "@aramon/ui/aramon-preloader";

export function SitePreloader() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

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

  if (pathname !== "/") return null;
  return <AramonPreloader className="site-preloader" src="/aramon/brand/preloader/preloading.mp4" poster="/aramon/brand/preloader/preloading-poster.jpg" ready={ready} minimumDuration={900} />;
}
