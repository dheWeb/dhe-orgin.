import type { CellDefinition } from "@/data/cells/types";

export type CellOverride = {
  displayTitle?: string;
  blocks?: Array<{ title?: string; objective?: string; footnote?: string }>;
};

export type CellOverridesMap = Record<string, CellOverride>;

export function parseCellOverrides(
  value?: Record<string, string>
): CellOverridesMap {
  if (!value?.json?.trim()) return {};
  try {
    const parsed = JSON.parse(value.json) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as CellOverridesMap)
      : {};
  } catch {
    return {};
  }
}

export function mergeCellWithCms(
  cell: CellDefinition,
  override?: CellOverride
): CellDefinition {
  if (!override) return cell;

  const blocks = cell.blocks.map((block, index) => {
    const patch = override.blocks?.[index];
    if (!patch) return block;
    return {
      title: patch.title ?? block.title,
      objective: patch.objective ?? block.objective,
      footnote: patch.footnote ?? block.footnote,
    };
  });

  return {
    ...cell,
    displayTitle: override.displayTitle?.trim() || cell.displayTitle,
    blocks,
  };
}
