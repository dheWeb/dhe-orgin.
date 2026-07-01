import { createPageMetadata } from "@/lib/seo/build-metadata";
import HomeStructuredData from "@/components/seo/HomeStructuredData";
import HomePageContent from "./HomePageContent";
import { getSiteContent } from "@/lib/cms/site-content";
import { parseMarqueeItems } from "@/lib/cms/cms-parsers";
import { homeIntro as defaultHomeIntro, closingCta as defaultClosingCta } from "@/data/home/content";

export const metadata = createPageMetadata("home");

export default async function Home() {
  const content = await getSiteContent([
    "home_tagline",
    "home_intro",
    "marquee_items",
    "home_vision",
    "home_closing_cta",
  ]);
  const tagline = content.home_tagline?.text;
  const intro = content.home_intro;
  const homeIntro = {
    badge: intro?.badge || defaultHomeIntro.badge,
    titleLine1: intro?.title_line1 || defaultHomeIntro.titleLine1,
    titleLine2: intro?.title_line2 || defaultHomeIntro.titleLine2,
    description: intro?.description || defaultHomeIntro.description,
  };
  const marqueeItems = parseMarqueeItems(content.marquee_items);
  const visionBody = content.home_vision?.body?.trim();
  const closing = content.home_closing_cta;
  const closingCta = {
    titleLine1: closing?.title_line1 || defaultClosingCta.titleLine1,
    titleLine2: closing?.title_line2 || defaultClosingCta.titleLine2,
    body: closing?.body || defaultClosingCta.body,
  };

  return (
    <>
      <HomeStructuredData />
      <HomePageContent
        tagline={tagline}
        homeIntro={homeIntro}
        marqueeItems={marqueeItems}
        visionBody={visionBody}
        closingCta={closingCta}
      />
    </>
  );
}
