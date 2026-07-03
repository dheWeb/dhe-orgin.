import { Compass, Sprout, ClipboardCheck, PartyPopper } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeIn } from "@/components/shared/FadeIn";

const pillars = [
  {
    icon: Compass,
    title: "Discover",
    description: "Identify hidden talent across every district, school, and community in India.",
  },
  {
    icon: Sprout,
    title: "Nurture",
    description: "Provide preparation resources, mentorship pathways, and learning support.",
  },
  {
    icon: ClipboardCheck,
    title: "Assess",
    description: "Fair, rigorous, and grade-appropriate evaluations designed by experts.",
  },
  {
    icon: PartyPopper,
    title: "Celebrate",
    description: "Recognise achievement through certificates, scholarships, and the Hall of Fame.",
  },
];

export function WhyTejasSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow="Why TEJAS"
            title="Gurukul Clarity × Nalanda Wisdom × Modern Technology"
            subtitle="A premium talent ecosystem built for India's next generation of thinkers, creators, and leaders."
          />
        </FadeIn>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <FadeIn key={pillar.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-tejas h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tejas-saffron-soft text-tejas-saffron">
                  <pillar.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-5 text-xl font-bold text-tejas-ink">{pillar.title}</h3>
                <p className="mt-3 text-sm text-tejas-muted leading-relaxed">{pillar.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
