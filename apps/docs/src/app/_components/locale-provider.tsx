"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type DocsLocale = "en" | "fr" | "ar";

const localeOrder: DocsLocale[] = ["en", "fr", "ar"];
const LocaleContext = createContext<{ locale: DocsLocale; cycleLocale: () => void } | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<DocsLocale>("en");
  const value = useMemo(() => ({
    locale,
    cycleLocale() {
      const next = localeOrder[(localeOrder.indexOf(locale) + 1) % localeOrder.length]!;
      document.documentElement.lang = next;
      document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
      document.documentElement.dataset.aramonLocale = next;
      setLocale(next);
    },
  }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useDocsLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useDocsLocale must be used within LocaleProvider.");
  return value;
}
