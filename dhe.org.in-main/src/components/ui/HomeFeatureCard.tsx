import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href?: string;
  external?: boolean;
  title: string;
  description?: string;
  stat?: string;
  icon?: ReactNode;
  className?: string;
};

export default function HomeFeatureCard({
  href,
  external,
  title,
  description,
  stat,
  icon,
  className = "",
}: Props) {
  const inner = (
    <>
      {icon ? (
        <div
          className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100"
          aria-hidden
        >
          {icon}
        </div>
      ) : null}
      <h3 className="text-base font-semibold text-gray-900 group-hover:text-orange-700 transition-colors">
        {title}
      </h3>
      {stat ? (
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-orange-600">
          {stat}
        </p>
      ) : null}
      {description ? (
        <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
          {description}
        </p>
      ) : null}
      {href ? (
        <span className="mt-3 inline-flex text-sm font-medium text-orange-700 group-hover:underline">
          Learn more →
        </span>
      ) : null}
    </>
  );

  const base =
    "group block h-full rounded-2xl border border-gray-200/80 bg-white p-5 shadow-dhe-sm hover:shadow-dhe-md hover:border-orange-200 hover:-translate-y-0.5 motion-safe:transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2";

  if (!href) {
    return <article className={`${base} ${className}`}>{inner}</article>;
  }

  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${className}`}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${className}`}>
      {inner}
    </Link>
  );
}
