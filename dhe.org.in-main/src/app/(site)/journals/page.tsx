import { createPageMetadata } from "@/lib/seo/build-metadata";
import Journals from "@/components/sections/Journals";

export const metadata = createPageMetadata("journals");

export default function JournalsPage() {
  return <Journals />;
}
