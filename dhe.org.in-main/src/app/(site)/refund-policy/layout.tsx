import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="refundPolicy" />
      {children}
    </>
  );
}
