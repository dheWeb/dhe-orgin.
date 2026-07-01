import { describe, expect, it } from "vitest";
import { mergeCellWithCms, parseCellOverrides } from "./cell-overrides";

const baseCell = {
  slug: "rd",
  displayTitle: "R & D Cell",
  seoTitle: "R & D Cell",
  layoutVariant: "simple" as const,
  slides: [],
  blocks: [
    { objective: "Original objective", footnote: "Original footnote" },
  ],
};

describe("parseCellOverrides", () => {
  it("returns empty map for invalid JSON", () => {
    expect(parseCellOverrides({ json: "not-json" })).toEqual({});
  });

  it("parses slug-keyed overrides", () => {
    const map = parseCellOverrides({
      json: JSON.stringify({ rd: { displayTitle: "Research Cell" } }),
    });
    expect(map.rd?.displayTitle).toBe("Research Cell");
  });
});

describe("mergeCellWithCms", () => {
  it("merges display title and block fields", () => {
    const merged = mergeCellWithCms(baseCell, {
      displayTitle: "Research & Development",
      blocks: [{ objective: "Updated objective" }],
    });
    expect(merged.displayTitle).toBe("Research & Development");
    expect(merged.blocks[0]?.objective).toBe("Updated objective");
    expect(merged.blocks[0]?.footnote).toBe("Original footnote");
  });
});
