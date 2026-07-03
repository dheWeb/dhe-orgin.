"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { brand } from "@/design-system/tokens";

export function TejasNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-tejas-ivory/95 backdrop-blur-md">
      <div className="border-b border-stone-200/60 bg-tejas-blue px-4 py-1.5 text-center text-xs text-white/90">
        <span>Proudly powered by </span>
        <a
          href="https://www.dhe.org.in"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-tejas-saffron hover:underline inline-flex items-center gap-0.5"
        >
          Department of Holistic Education
          <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </div>
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tejas-saffron rounded-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tejas-saffron text-sm font-black text-white">
            T
          </div>
          <div className="leading-tight">
            <span className="block text-lg font-bold text-tejas-blue">{brand.name}</span>
            <span className="hidden text-[10px] text-tejas-muted sm:block">Talent Evaluation & Joint Assessment</span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-tejas-saffron focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tejas-saffron",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-tejas-saffron bg-tejas-saffron-soft/50"
                  : "text-tejas-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/prepare/mock-tests"
            className="text-sm font-medium text-tejas-blue hover:text-tejas-saffron"
          >
            Free Mock Test
          </Link>
          <Button size="sm" disabled title="Registration opens soon">
            Register
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-tejas-ink lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tejas-saffron"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-stone-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-tejas-ink hover:bg-tejas-saffron-soft"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-tejas-ink hover:bg-tejas-saffron-soft"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-tejas-ink hover:bg-tejas-saffron-soft"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
