import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

export default function PeopleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData trail="people" />
      {children}
    </>
  );
}
