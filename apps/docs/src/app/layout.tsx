import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@aramon/tokens/theme.css";
import "./globals.css";
import { LocaleProvider } from "./_components/locale-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.aramon.ma"),
  title: { default: "Aramon UI", template: "%s" },
  description: "The source-owned design system for Aramon products and the agents that build them.",
  applicationName: "Aramon UI",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-aramon-theme="light" data-scroll-behavior="smooth" className="h-full antialiased" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('aramon-theme')==='dark')document.documentElement.dataset.aramonTheme='dark'}catch(e){}" }} /></head>
      <body className="min-h-full"><LocaleProvider><a className="skip-link" href="#main-content">Skip to content</a>{children}</LocaleProvider></body>
    </html>
  );
}
