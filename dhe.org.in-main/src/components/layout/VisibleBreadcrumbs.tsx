"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGE_SEO } from "@/lib/seo/pages-registry";
import { CELLS } from "@/data/cells";
import { PROGRAMS } from "@/data/programs/registry";

function buildTrail(pathname: string): { name: string; path: string }[] {
  if (pathname === "/") return [];

  const items: { name: string; path: string }[] = [{ name: "Home", path: "/" }];

  const pageEntry = Object.values(PAGE_SEO).find((p) => p.path === pathname);
  if (pageEntry) {
    items.push({ name: pageEntry.title, path: pageEntry.path });
    return items;
  }

  if (pathname.startsWith("/cells/")) {
    const slug = pathname.replace("/cells/", "");
    const cell = CELLS.find((c) => c.slug === slug);
    items.push({ name: "Cells & Structure", path: "/structure" });
    items.push({
      name: cell?.displayTitle ?? slug,
      path: pathname,
    });
    return items;
  }

  if (pathname.startsWith("/programs/")) {
    const slug = pathname.replace("/programs/", "");
    const program = PROGRAMS.find((p) => p.slug === slug);
    items.push({ name: "Programs", path: "/programs" });
    items.push({
      name: program?.title ?? slug,
      path: pathname,
    });
    return items;
  }

  const segment = pathname.split("/").filter(Boolean).pop() ?? "";
  items.push({
    name: segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    path: pathname,
  });
  return items;
}

export default function VisibleBreadcrumbs() {
  const pathname = usePathname() ?? "/";
  const trail = buildTrail(pathname);

  if (trail.length < 2) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="dhe-container py-2 text-xs sm:text-sm text-gray-600"
    >
      <ol className="flex flex-wrap items-center gap-1.5" role="list">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 ? (
                <span className="text-gray-400" aria-hidden>
                  /
                </span>
              ) : null}
              {isLast ? (
                <span className="font-medium text-gray-800" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="text-orange-700 hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
