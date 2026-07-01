import React from "react";

type SectionHeadingProps = {
  id: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export default function SectionHeading({
  id,
  title,
  description,
  align = "left",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <header className={`mb-3 max-w-3xl ${alignClass} ${className}`}>
      <h2
        id={id}
        className={`text-lg sm:text-xl font-semibold tracking-tight break-words ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-1.5 text-xs sm:text-sm leading-relaxed break-words ${
            light ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
