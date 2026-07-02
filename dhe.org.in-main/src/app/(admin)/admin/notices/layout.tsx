import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("adminNotices");

export default function AdminNoticesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
