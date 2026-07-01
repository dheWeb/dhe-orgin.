import DirectorMessage from "@/components/sections/DirectorMessage";
import { getSiteContent } from "@/lib/cms/site-content";

export default async function Message() {
  const content = await getSiteContent(["director_message"]);
  const body = content.director_message?.body?.trim();
  const aboutParagraphs = body
    ? body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : undefined;

  return <DirectorMessage aboutParagraphs={aboutParagraphs} />;
}
