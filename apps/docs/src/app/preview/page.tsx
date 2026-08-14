import type { Metadata } from "next";
import { PreviewWorkspace } from "./preview-workspace";

export const metadata: Metadata = {
  title: "Approval preview · Aramon UI",
  description: "An isolated desktop-workspace study for the next Aramon UI material direction.",
};

export default function PreviewPage() {
  return <PreviewWorkspace />;
}
