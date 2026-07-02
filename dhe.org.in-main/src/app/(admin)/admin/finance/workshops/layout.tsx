import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("adminWorkshops");

export default function AdminWorkshopsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
