import { modalMessagesEn, type ModalMessages } from "./en";
import { modalMessagesHi } from "./hi";
import type { Locale } from "../types";

const messagesByLocale: Partial<Record<Locale, ModalMessages>> = {
  en: modalMessagesEn,
  hi: modalMessagesHi,
};
export function getModalMessages(locale: Locale = "en"): ModalMessages {
  return messagesByLocale[locale] ?? modalMessagesEn;
}

export type { ModalMessages };
