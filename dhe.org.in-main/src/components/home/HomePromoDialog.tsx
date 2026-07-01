"use client";

import React, { memo } from "react";
import Modal from "@/components/ui/Modal";
import { getModalMessages } from "@/lib/i18n/modal";
import type { Locale } from "@/lib/i18n/types";
import { useHomePromoModal } from "@/hooks/useHomePromoModal";

type HomePromoDialogProps = {
  locale?: Locale;
};

function HomePromoDialogContent({ locale = "en" }: HomePromoDialogProps) {
  const { isOpen, shouldRender, close } = useHomePromoModal();
  const t = getModalMessages(locale).homePromo;
  const labels = getModalMessages(locale);

  if (!shouldRender) {
    return null;
  }

  const ariaTitle = `${t.title} — ${t.titleHighlight}`;
  const ariaDescription = `${t.description} ${t.location} from ${t.dateRange}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      locale={locale}
      title={ariaTitle}
      description={ariaDescription}
    >
      <article className="text-center min-w-0">
        <div
          className="inline-flex max-w-full items-center px-3 py-2 sm:px-4 rounded-full bg-orange-500/20 text-orange-200 text-xs sm:text-sm font-semibold border border-orange-400/30 mb-4 sm:mb-6 break-words"
        >
          {t.badge}
        </div>

        <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-snug sm:leading-tight break-words hyphens-auto">
          {t.title}
          <span className="block text-orange-400 mt-1 sm:mt-2">
            {t.titleHighlight}
          </span>
        </h3>

        <p className="text-gray-300 mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-relaxed sm:leading-8 max-w-prose mx-auto px-0 sm:px-2 break-words">
          {t.description}{" "}
          <span className="font-bold text-orange-400">{t.location}</span>
          <br className="hidden sm:inline" />
          <span className="sm:hidden"> </span>
          <span className="text-gray-300">{t.from}</span>{" "}
          <span className="font-bold text-white">{t.dateRange}</span>
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 max-w-md sm:max-w-none mx-auto">
          <a
            href="https://www.rase.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-base font-semibold shadow-lg transition-colors duration-200 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111f] motion-safe:hover:scale-[1.02]"
          >
            {t.visitWebsite}
          </a>

          <button
            type="button"
            onClick={close}
            className="inline-flex min-h-11 items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-2xl border border-white/25 text-white text-base font-semibold transition-colors duration-200 hover:border-orange-400 hover:text-orange-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111f]"
          >
            {labels.homePromo.continue}
          </button>
        </div>
      </article>
    </Modal>
  );
}

const HomePromoDialog = memo(HomePromoDialogContent);
HomePromoDialog.displayName = "HomePromoDialog";

export default HomePromoDialog;
