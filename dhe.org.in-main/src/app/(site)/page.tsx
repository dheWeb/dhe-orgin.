import { createPageMetadata } from "@/lib/seo/build-metadata";
import HomeStructuredData from "@/components/seo/HomeStructuredData";
import HomePageContent from "./HomePageContent";

export const metadata = createPageMetadata("home");

export default function Home() {
  return (
    <>
      <HomeStructuredData />
      <HomePageContent />
    </>
  );
}
