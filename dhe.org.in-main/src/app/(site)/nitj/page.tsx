import InstituteChapter from "@/components/sections/InstituteChapter";
import { INSTITUTE_CHAPTERS } from "@/data/institute-chapters";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("nitj");

export default function NitjChapterPage() {
  return <InstituteChapter chapter={INSTITUTE_CHAPTERS.nitj} />;
}
