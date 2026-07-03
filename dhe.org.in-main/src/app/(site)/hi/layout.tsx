import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export default function HindiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="hindi" />
      {children}
    </>
  );
}
