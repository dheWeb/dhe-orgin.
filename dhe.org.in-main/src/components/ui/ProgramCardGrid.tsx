import HomeFeatureCard from "@/components/ui/HomeFeatureCard";

type ProgramItem = {
  slug: string;
  title: string;
  summary: string;
  href?: string;
};

export default function ProgramCardGrid({ programs }: { programs: ProgramItem[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
      {programs.map((item) => {
        const detailHref = `/programs/${item.slug}`;
        const external = item.href?.startsWith("http");
        return (
          <li key={item.slug}>
            <HomeFeatureCard
              href={detailHref}
              title={item.title}
              description={item.summary}
              stat={external ? "External portal" : undefined}
            />
          </li>
        );
      })}
    </ul>
  );
}
