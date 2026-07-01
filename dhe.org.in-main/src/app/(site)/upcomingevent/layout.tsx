import { createPageMetadata } from "@/lib/seo/build-metadata";
import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export const metadata = createPageMetadata("upcomingevent");

export default function UpcomingEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="upcomingevent" />
      {children}
    </>
  );
}
