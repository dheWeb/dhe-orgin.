import { createPageMetadata } from "@/lib/seo/build-metadata";
import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export const metadata = createPageMetadata("leadership");

export default function LeadershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="leadership" />
      {children}
    </>
  );
}
