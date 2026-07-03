import { notFound } from "next/navigation";
import Link from "next/link";
import { createMetadata } from "@/config/seo";
import { getOlympiadDetail, getAllOlympiadSlugs } from "@/data/olympiad-details";
import { StickySubNav } from "@/components/shared/StickySubNav";
import { Countdown } from "@/components/shared/Countdown";
import { CertificatePreview } from "@/components/shared/CertificatePreview";
import { ResourceCard } from "@/components/shared/ResourceCard";
import { FAQAccordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/shared/FadeIn";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllOlympiadSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const olympiad = getOlympiadDetail(slug);
  if (!olympiad) return {};
  return createMetadata({
    title: `${olympiad.name} Olympiad`,
    description: olympiad.description,
    path: `/olympiads/${slug}`,
  });
}

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "eligibility", label: "Eligibility" },
  { id: "pattern", label: "Exam Pattern" },
  { id: "syllabus", label: "Syllabus" },
  { id: "resources", label: "Resources" },
  { id: "awards", label: "Awards" },
  { id: "faq", label: "FAQ" },
];

export default async function OlympiadDetailPage({ params }: Props) {
  const { slug } = await params;
  const olympiad = getOlympiadDetail(slug);
  if (!olympiad) notFound();

  return (
    <>
      <section className="bg-tejas-blue py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Badge className="bg-tejas-saffron text-white">{olympiad.grades}</Badge>
              <h1 className="mt-4 text-4xl font-bold md:text-5xl">{olympiad.name} Olympiad</h1>
              {olympiad.nameHi && (
                <p className="mt-2 font-hindi text-lg text-white/70">{olympiad.nameHi}</p>
              )}
              <p className="mt-4 max-w-2xl text-white/80 leading-relaxed">{olympiad.description}</p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <span>{olympiad.duration}</span>
                <span>·</span>
                <span>{olympiad.questions} questions</span>
                {olympiad.examDate && (
                  <>
                    <span>·</span>
                    <span>Exam: {new Date(olympiad.examDate).toLocaleDateString("en-IN", { dateStyle: "long" })}</span>
                  </>
                )}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button disabled title="Registration opens soon">Register Now</Button>
                <Link href="/prepare/mock-tests">
                  <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
                    Free Mock Test
                  </Button>
                </Link>
              </div>
            </div>
            {olympiad.examDate && (
              <Countdown targetDate="2027-10-01" label="Registration closes in" />
            )}
          </div>
        </div>
      </section>

      <StickySubNav items={navItems} />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section id="overview" className="scroll-mt-32 pb-16">
          <FadeIn>
            <h2 className="text-2xl font-bold text-tejas-ink">Subject Overview</h2>
            <p className="mt-4 max-w-3xl text-tejas-muted leading-relaxed">
              The {olympiad.name} Olympiad is part of the current TEJAS edition, designed to
              assess grade-appropriate competencies through objective and analytical questions.
              Performance is benchmarked nationally with state-wise and school-wise rankings.
            </p>
          </FadeIn>
        </section>

        <section id="eligibility" className="scroll-mt-32 border-t border-stone-200 py-16">
          <h2 className="text-2xl font-bold text-tejas-ink">Eligibility</h2>
          <ul className="mt-6 space-y-3">
            {olympiad.eligibility.map((item) => (
              <li key={item} className="flex items-start gap-3 text-tejas-muted">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-tejas-saffron" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="pattern" className="scroll-mt-32 border-t border-stone-200 py-16">
          <h2 className="text-2xl font-bold text-tejas-ink">Exam Pattern</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-tejas-ivory">
                  <th className="px-6 py-4 font-semibold">Section</th>
                  <th className="px-6 py-4 font-semibold">Questions</th>
                  <th className="px-6 py-4 font-semibold">Marks</th>
                </tr>
              </thead>
              <tbody>
                {olympiad.examPattern.map((row) => (
                  <tr key={row.section} className="border-t border-stone-100">
                    <td className="px-6 py-4">{row.section}</td>
                    <td className="px-6 py-4">{row.questions}</td>
                    <td className="px-6 py-4">{row.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="syllabus" className="scroll-mt-32 border-t border-stone-200 py-16">
          <h2 className="text-2xl font-bold text-tejas-ink">Syllabus</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {olympiad.syllabus.map((item) => (
              <li key={item} className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-tejas-muted">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="resources" className="scroll-mt-32 border-t border-stone-200 py-16">
          <h2 className="text-2xl font-bold text-tejas-ink">Resources & Books</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {olympiad.resources.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
          <div className="mt-10">
            <h3 className="text-lg font-bold text-tejas-ink">Recommended Books</h3>
            <ul className="mt-4 space-y-3">
              {olympiad.books.map((book) => (
                <li key={book.title} className="rounded-xl border border-stone-200 p-4">
                  <p className="font-semibold text-tejas-ink">{book.title}</p>
                  <p className="text-sm text-tejas-muted">{book.author} · {book.publisher}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="awards" className="scroll-mt-32 border-t border-stone-200 py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-tejas-ink">Awards & Recognition</h2>
              <ul className="mt-6 space-y-4">
                {olympiad.awards.map((award) => (
                  <li key={award.level} className="rounded-xl border border-stone-200 p-4">
                    <p className="font-semibold text-tejas-saffron">{award.level}</p>
                    <p className="mt-1 text-sm text-tejas-muted">{award.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <CertificatePreview olympiad={`${olympiad.name} Olympiad`} />
          </div>
        </section>

        <section id="faq" className="scroll-mt-32 border-t border-stone-200 py-16">
          <h2 className="mb-6 text-2xl font-bold text-tejas-ink">FAQs</h2>
          <FAQAccordion items={olympiad.faqs} />
        </section>
      </div>
    </>
  );
}
