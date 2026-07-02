import { describe, expect, it } from "vitest";
import { mergeMarqueeWithNotices } from "@/lib/cms/merge-marquee-notices";

describe("mergeMarqueeWithNotices", () => {
  it("prepends notice titles and dedupes CMS items", () => {
    const cms = [
      { text: "Static promo", link: "/programs" },
      { text: "New notice title", link: "/old" },
    ];
    const notices = [
      {
        id: "1",
        title: "New notice title",
        date: "2026-01-01",
        imageUrl: "/logo.webp",
      },
    ];

    const merged = mergeMarqueeWithNotices(cms, notices);

    expect(merged[0]).toEqual({ text: "New notice title", link: "/noticeboard" });
    expect(merged[1]).toEqual({ text: "Static promo", link: "/programs" });
    expect(merged).toHaveLength(2);
  });
});
