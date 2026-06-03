import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("WD");

export default function WDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
