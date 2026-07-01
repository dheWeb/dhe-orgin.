import { createPageMetadata } from "@/lib/seo/build-metadata";
import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export const metadata = createPageMetadata("contribute");

export default function ContributeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="contribute" />
      {children}
    </>
  );
}
