import { getSiteContent } from "@/lib/cms/site-content";
import { homeTestimonials as DEFAULT_TESTIMONIALS } from "@/data/home/redesign-content";

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
};

function parseTestimonialsJson(
  raw: string | undefined,
  fallback: TestimonialItem[]
): TestimonialItem[] {
  if (!raw?.trim()) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || !parsed.length) return fallback;
    return parsed.filter(
      (item): item is TestimonialItem =>
        typeof item === "object" &&
        item !== null &&
        "quote" in item &&
        "name" in item &&
        "role" in item
    );
  } catch {
    return fallback;
  }
}

export async function getHomeTestimonials(): Promise<TestimonialItem[]> {
  const content = await getSiteContent(["home_testimonials_json"]);
  return parseTestimonialsJson(
    content.home_testimonials_json?.json,
    [...DEFAULT_TESTIMONIALS]
  );
}
