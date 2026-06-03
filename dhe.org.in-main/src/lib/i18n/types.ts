export type Locale = "en" | "hi" | "ar" | "ur" | "he";

export const RTL_LOCALES: readonly Locale[] = ["ar", "ur", "he"];

export const isRtlLocale = (locale: Locale): boolean =>
  RTL_LOCALES.includes(locale);
