import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export default function LogosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="logos" />
      {children}
    </>
  );
}
