import type { Metadata } from "next";
import "@aramon/tokens/theme.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aramon UI",
  description: "The component system for focused Aramon applications.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-aramon-theme="light" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
