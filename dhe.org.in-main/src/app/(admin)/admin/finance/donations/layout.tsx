import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("adminDonations");

export default function AdminDonationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
