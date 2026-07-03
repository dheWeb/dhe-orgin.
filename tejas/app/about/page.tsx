import { createMetadata } from "@/config/seo";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeIn } from "@/components/shared/FadeIn";
import { Testimonial } from "@/components/shared/Testimonial";
import { brand } from "@/design-system/tokens";

export const metadata = createMetadata({
  title: "About TEJAS",
  description: "Learn about TEJAS — India's National Talent Development Ecosystem by the Department of Holistic Education.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="India's National Talent Development Ecosystem"
        subtitle={`${brand.fullName} (${brand.name}) is engineered as an independent platform — proudly powered by the ${brand.parentOrg}.`}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <FadeIn>
              <SectionHeader
                title="Our Mission"
                subtitle="To discover, nurture, assess, and celebrate talent from every corner of India — ensuring no gifted student is left behind."
                align="left"
                className="mb-0"
              />
              <div className="mt-8 space-y-4 text-tejas-muted leading-relaxed">
                <p>
                  TEJAS is not just an olympiad platform. It is the foundation of a complete
                  educational ecosystem that will eventually include student, parent, teacher,
                  and school portals, live examinations, AI mentorship, scholarships, and the
                  National Talent Index.
                </p>
                <p>
                  Like Google Classroom belongs to Google but operates as its own product,
                  TEJAS belongs to DHE but is engineered as a standalone application at{" "}
                  <strong className="text-tejas-ink">{brand.domain}</strong>.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Testimonial
                quote="TEJAS represents the future of talent assessment in India — rigorous, inclusive, and aspirational."
                author="DHE Academic Council"
                role="Department of Holistic Education"
              />
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className="mt-20 grid gap-8 md:grid-cols-3">
              {[
                { title: "Vision", text: "Every Indian student discovered and supported to reach their highest potential." },
                { title: "Values", text: "Excellence, equity, integrity, and innovation in everything we build." },
                { title: "Approach", text: "Modular, scalable architecture ready for a decade of growth." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-stone-200 bg-white p-8 shadow-tejas">
                  <h3 className="text-xl font-bold text-tejas-saffron">{item.title}</h3>
                  <p className="mt-3 text-tejas-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
