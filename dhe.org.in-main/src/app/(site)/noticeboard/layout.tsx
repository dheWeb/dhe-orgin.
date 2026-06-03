import { createPageMetadata } from "@/lib/seo/build-metadata";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { getBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";

export const metadata = createPageMetadata("noticeboard");

export default function NoticeboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageStructuredData
        graph={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Notice Board", path: "/noticeboard" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
