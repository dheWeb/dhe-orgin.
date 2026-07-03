import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

/** Consistent page header band used across hub pages */
export default function PageHero({ eyebrow, title, description, children }: Props) {
  return (
    <div className="bg-gradient-to-b from-orange-50/40 to-white border-b border-gray-100">
      <div className="dhe-container py-10 sm:py-14 max-w-6xl mx-auto">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={`${eyebrow ? "mt-2" : ""} text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight`}
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </div>
  );
}
