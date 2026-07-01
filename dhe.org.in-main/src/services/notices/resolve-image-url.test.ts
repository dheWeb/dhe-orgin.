import { describe, expect, it } from "vitest";
import { resolveNoticeImageUrl } from "@/services/notices/resolve-image-url";

describe("resolveNoticeImageUrl", () => {
  it("returns webp fallback when empty", () => {
    expect(resolveNoticeImageUrl(null)).toBe("/logo.webp");
    expect(resolveNoticeImageUrl("")).toBe("/logo.webp");
  });

  it("keeps absolute URLs", () => {
    expect(resolveNoticeImageUrl("https://example.com/a.jpg")).toBe(
      "https://example.com/a.jpg"
    );
  });

  it("keeps same-origin paths", () => {
    expect(resolveNoticeImageUrl("/2024K/k6.webp")).toBe("/2024K/k6.webp");
  });

  it("prefixes relative paths with slash", () => {
    expect(resolveNoticeImageUrl("notice/foo.jpg")).toBe("/notice/foo.jpg");
  });
});
