import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("donationdatadekh");

export default function DonationDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
