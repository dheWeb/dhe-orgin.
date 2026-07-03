import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export default function AccessibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="accessibility" />
      {children}
    </>
  );
}
