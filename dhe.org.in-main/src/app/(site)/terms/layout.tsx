import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="terms" />
      {children}
    </>
  );
}
