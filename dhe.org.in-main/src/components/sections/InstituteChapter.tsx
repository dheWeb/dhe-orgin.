import Link from "next/link";
import type { InstituteChapter } from "@/data/institute-chapters";

type Props = {
  chapter: InstituteChapter;
};

export default function InstituteChapter({ chapter }: Props) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <p className="text-sm font-medium uppercase tracking-wide text-brand-saffron">
        DHE Institutional Chapter
      </p>
      <h1 className="mt-2 font-serif text-3xl font-bold text-brand-navy md:text-4xl">
        {chapter.name}
      </h1>
      <p className="mt-1 text-muted-foreground">{chapter.location}</p>
      <p className="mt-6 text-lg leading-relaxed text-foreground">
        {chapter.description}
      </p>
      <div className="mt-10 rounded-lg border border-border bg-muted/40 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">
          Chapter updates
        </h2>
        <p className="mt-3 text-muted-foreground">
          Programs, events, and resources for the {chapter.shortName} chapter
          will be published here. For national DHE initiatives, visit the main
          portal.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/programs"
            className="rounded-md bg-brand-saffron px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            DHE Programs
          </Link>
          <Link
            href="/events"
            className="rounded-md border border-brand-navy px-4 py-2 text-sm font-medium text-brand-navy hover:bg-brand-navy/5"
          >
            Events
          </Link>
          <Link
            href="/"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            DHE Home
          </Link>
        </div>
      </div>
    </main>
  );
}
