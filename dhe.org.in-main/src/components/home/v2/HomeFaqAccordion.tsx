"use client";

import { useId, useState } from "react";

type FaqItem = { question: string; answer: string };

export default function HomeFaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={item.question}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-dhe-sm"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm sm:text-base font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500 min-h-11"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <span
                  className={`shrink-0 text-orange-600 motion-safe:transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  ▼
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-4 pb-4 text-sm text-gray-700 leading-relaxed border-t border-gray-100"
            >
              <p className="pt-3">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
