import type { CellDefinition } from "./types";
import registry from "./registry.json";

export const CELLS = registry as CellDefinition[];

export const CELL_SLUGS = CELLS.map((cell) => cell.slug);

const cellMap = new Map<string, CellDefinition>(
  CELLS.map((cell) => [cell.slug, cell])
);

export function getCellBySlug(slug: string): CellDefinition | undefined {
  return cellMap.get(slug);
}

export function getAllCellSlugs(): readonly string[] {
  return CELL_SLUGS;
}

export function getCellSeoTitle(slug: string): string {
  return getCellBySlug(slug)?.seoTitle ?? `${slug} Cell`;
}

export { getCellEnrichment } from "./enrichment";
export type {
  CellEnrichmentContent,
  CellEnrichmentLink,
  CellFaq,
} from "./enrichment-types";
