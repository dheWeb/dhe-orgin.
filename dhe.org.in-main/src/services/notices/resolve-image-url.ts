const LEGACY_ASSET_ORIGIN =
  process.env.NEXT_PUBLIC_LEGACY_ASSET_ORIGIN ?? "https://www.dhe.org.in";

/** Firebase notice paths are often site-relative; resolve for local dev and CDN. */
export function resolveNoticeImageUrl(url: string | undefined | null): string {
  if (!url?.trim()) return "/logo.png";
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/")) {
    return `${LEGACY_ASSET_ORIGIN}${trimmed}`;
  }
  return `${LEGACY_ASSET_ORIGIN}/${trimmed}`;
}
