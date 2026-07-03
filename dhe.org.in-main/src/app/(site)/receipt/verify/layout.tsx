import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export default function ReceiptVerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="receiptVerify" />
      {children}
    </>
  );
}
