import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="privacyPolicy" />
      {children}
    </>
  );
}
