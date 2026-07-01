/** Resolve notice image paths (relative `/…` or absolute URLs). */
export function resolveNoticeImageUrl(url: string | undefined | null): string {
  if (!url?.trim()) return "/logo.webp";
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/")) return trimmed;
  return `/${trimmed}`;
}
