export const SUPPORTED_LOCALES = [
  "en", "cs", "sk", "es", "de", "fr", "pt", "it", "pl", "nl",
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  cs: "Čeština",
  sk: "Slovenčina",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  pt: "Português",
  it: "Italiano",
  pl: "Polski",
  nl: "Nederlands",
};
