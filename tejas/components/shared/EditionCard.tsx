import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface EditionCardProps {
  year: number;
  name: string;
  subtitle: string;
  theme?: string;
  status?: "current" | "upcoming" | "past";
  href?: string;
  featured?: boolean;
  className?: string;
}

export function EditionCard({
  year,
  name,
  subtitle,
  theme,
  status = "upcoming",
  href = "/editions",
  featured = false,
  className,
}: EditionCardProps) {
  const statusLabel =
    status === "current" ? "Current Edition" : status === "past" ? "Past" : "Upcoming";

  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-2xl border border-stone-200/80 bg-white p-6 shadow-tejas transition-all hover:-translate-y-1 hover:shadow-tejas-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tejas-saffron",
        featured && "border-tejas-saffron/30 bg-gradient-to-br from-white to-tejas-saffron-soft/30",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-4xl font-bold text-tejas-blue">{year}</p>
          <Badge
            variant={status === "current" ? "default" : "outline"}
            className="mt-2"
          >
            {statusLabel}
          </Badge>
        </div>
        <div
          className="h-12 w-12 rounded-full bg-tejas-saffron/10 flex items-center justify-center text-tejas-saffron font-bold text-sm"
          aria-hidden
        >
          TEJAS
        </div>
      </div>
      <h3 className="mt-4 text-xl font-bold text-tejas-ink group-hover:text-tejas-saffron transition-colors">
        {name}
      </h3>
      <p className="mt-1 text-sm font-medium text-tejas-muted">{subtitle}</p>
      {theme && (
        <p className="mt-3 text-sm italic text-tejas-blue">&ldquo;{theme}&rdquo;</p>
      )}
    </Link>
  );
}
