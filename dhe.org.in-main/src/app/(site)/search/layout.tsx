import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="search" />
      {children}
    </>
  );
}
