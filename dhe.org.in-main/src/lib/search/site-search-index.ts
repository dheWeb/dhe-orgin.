import { PAGE_SEO } from "@/lib/seo/pages-registry";
import { PROGRAMS } from "@/data/programs/registry";
import cellRegistry from "@/data/cells/registry.json";
import type { CellDefinition } from "@/data/cells/types";

export type SiteSearchEntry = {
  title: string;
  description: string;
  path: string;
};

export function buildSiteSearchIndex(): SiteSearchEntry[] {
  const pages: SiteSearchEntry[] = Object.values(PAGE_SEO)
    .filter((p) => !p.noIndex)
    .map((p) => ({
      title: p.title,
      description: p.description,
      path: p.path,
    }));

  const programs: SiteSearchEntry[] = PROGRAMS.map((p) => ({
    title: p.title,
    description: p.summary,
    path: `/programs/${p.slug}`,
  }));

  const cells: SiteSearchEntry[] = (cellRegistry as CellDefinition[]).map((c) => {
    const objective = c.blocks[0]?.objective?.trim() ?? "";
    return {
      title: c.displayTitle.trim(),
      description: objective.slice(0, 160) || `DHE ${c.displayTitle.trim()}`,
      path: `/cells/${c.slug}`,
    };
  });

  const byPath = new Map<string, SiteSearchEntry>();
  for (const entry of [...pages, ...programs, ...cells]) {
    byPath.set(entry.path, entry);
  }
  return Array.from(byPath.values());
}
