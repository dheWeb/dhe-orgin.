import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("noticeboarddata");

export default function NoticeboardDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
