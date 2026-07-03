import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export default function ResidentialCampsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="residentialcamps" />
      {children}
    </>
  );
}
