import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export default function AccountDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="accountdetails" />
      {children}
    </>
  );
}
