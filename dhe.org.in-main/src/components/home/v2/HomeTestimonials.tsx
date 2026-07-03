import { homeTestimonials } from "@/data/home/redesign-content";
import type { TestimonialItem } from "@/lib/cms/home-testimonials-content";
import HomeReveal from "./HomeReveal";
import HomeSectionShell from "./HomeSectionShell";

type Props = {
  items?: TestimonialItem[];
};

export default function HomeTestimonials({ items }: Props) {
  const testimonials = items?.length ? items : homeTestimonials;

  return (
    <HomeReveal>
      <HomeSectionShell
        id="testimonials-heading"
        title="Impact Stories"
        description="Educators, institutions, and partners engaging with DHE programs across Bharat."
        variant="muted"
      >
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5" role="list">
          {testimonials.map((item) => (
            <li key={`${item.name}-${item.role}`}>
              <blockquote className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-dhe-sm hover:shadow-dhe-md hover:border-orange-200 motion-safe:transition-all">
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-4 pt-4 border-t border-gray-100">
                  <cite className="not-italic">
                    <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                    <p className="text-xs text-orange-700 mt-0.5">{item.role}</p>
                  </cite>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </HomeSectionShell>
    </HomeReveal>
  );
}
