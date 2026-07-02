import { createPageMetadata } from "@/lib/seo/build-metadata";
import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export const metadata = createPageMetadata("books");

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="books" />
      {children}
    </>
  );
}
