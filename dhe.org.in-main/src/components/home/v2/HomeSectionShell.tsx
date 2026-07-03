import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  variant?: "white" | "muted" | "navy";
  className?: string;
};

export default function HomeSectionShell({
  id,
  title,
  description,
  children,
  variant = "white",
  className = "",
}: Props) {
  const bg =
    variant === "navy"
      ? "bg-dhe-navy text-white"
      : variant === "muted"
        ? "bg-dhe-muted"
        : "bg-white";

  return (
    <section
      aria-labelledby={id}
      className={`${bg} py-10 sm:py-14 lg:py-16 ${className}`}
    >
      <div className="dhe-container">
        <header className="max-w-2xl mb-8 sm:mb-10">
          <h2
            id={id}
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              variant === "navy" ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
          {description ? (
            <p
              className={`mt-3 text-sm sm:text-base leading-relaxed ${
                variant === "navy" ? "text-on-navy-muted" : "text-gray-600"
              }`}
            >
              {description}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}
