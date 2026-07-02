import { describe, expect, it } from "vitest";
import { buildSiteSearchIndex } from "@/lib/search/site-search-index";

describe("buildSiteSearchIndex", () => {
  it("includes pages, programs, and cells", () => {
    const index = buildSiteSearchIndex();
    expect(index.length).toBeGreaterThan(40);
    expect(index.some((e) => e.path === "/donation")).toBe(true);
    expect(index.some((e) => e.path === "/programs/shiksha-mahakumbh")).toBe(true);
    expect(index.some((e) => e.path === "/cells/art")).toBe(true);
  });
});
