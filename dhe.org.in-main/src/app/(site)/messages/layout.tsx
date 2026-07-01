import { createPageMetadata } from "@/lib/seo/build-metadata";
import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export const metadata = createPageMetadata("messages");

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="messages" />
      {children}
    </>
  );
}
