"use client";

import { useSyncExternalStore } from "react";
import { useDocsLocale } from "./locale-provider";

type Theme = "light" | "dark";
const localeLabels = { en: "EN", fr: "FR", ar: "AR" } as const;
const themeLabels = {
  en: { light: "Light", dark: "Dark", use: "Use", theme: "theme", locale: "Change preview locale" },
  fr: { light: "Clair", dark: "Sombre", use: "Utiliser le thème", theme: "", locale: "Changer la langue d’aperçu" },
  ar: { light: "فاتح", dark: "داكن", use: "استخدم النمط", theme: "", locale: "غيّر لغة المعاينة" },
} as const;

export function ThemeControls() {
  const { locale, cycleLocale } = useDocsLocale();
  const labels = themeLabels[locale];
  const theme = useSyncExternalStore(
    (notify) => {
      window.addEventListener("aramon-theme-change", notify);
      return () => window.removeEventListener("aramon-theme-change", notify);
    },
    () => document.documentElement.dataset.aramonTheme === "dark" ? "dark" : "light",
    () => "light",
  ) as Theme;

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.aramonTheme = next;
    localStorage.setItem("aramon-theme", next);
    window.dispatchEvent(new Event("aramon-theme-change"));
  };

  const nextTheme = theme === "light" ? "dark" : "light";
  return <div className="theme-controls"><button type="button" onClick={toggleTheme} aria-label={`${labels.use} ${labels[nextTheme]} ${labels.theme}`.trim()}>{labels[theme]}</button><button type="button" data-locale-control onClick={cycleLocale} aria-label={labels.locale}>{localeLabels[locale]}</button></div>;
}
