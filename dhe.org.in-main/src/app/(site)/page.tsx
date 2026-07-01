import { createPageMetadata } from "@/lib/seo/build-metadata";
import HomeStructuredData from "@/components/seo/HomeStructuredData";
import HomePageContent from "./HomePageContent";
import { getSiteContent } from "@/lib/cms/site-content";

export const metadata = createPageMetadata("home");

export default async function Home() {
  const content = await getSiteContent(["home_tagline"]);
  const tagline = content.home_tagline?.text;

  return (
    <>
      <HomeStructuredData />
      <HomePageContent tagline={tagline} />
    </>
  );
}
