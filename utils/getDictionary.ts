import type { Locale } from "./locales";

// Server-side only — loads locale JSON for SSR metadata.
const loaders: Record<string, () => Promise<Record<string, unknown>>> = {
  en:  () => import("../locales/en.json").then((m) => m.default as unknown as Record<string, unknown>),
  cs:  () => import("../locales/cs.json").then((m) => m.default as unknown as Record<string, unknown>),
  sk:  () => import("../locales/sk.json").then((m) => m.default as unknown as Record<string, unknown>),
  de:  () => import("../locales/de.json").then((m) => m.default as unknown as Record<string, unknown>),
  es:  () => import("../locales/es.json").then((m) => m.default as unknown as Record<string, unknown>),
  fr:  () => import("../locales/fr.json").then((m) => m.default as unknown as Record<string, unknown>),
  pt:  () => import("../locales/pt.json").then((m) => m.default as unknown as Record<string, unknown>),
  it:  () => import("../locales/it.json").then((m) => m.default as unknown as Record<string, unknown>),
  pl:  () => import("../locales/pl.json").then((m) => m.default as unknown as Record<string, unknown>),
  nl:  () => import("../locales/nl.json").then((m) => m.default as unknown as Record<string, unknown>),
};

type Dict = Record<string, Record<string, string>>;

export async function getDictionary(locale: string): Promise<Dict> {
  const loader = loaders[locale] ?? loaders.en;
  return loader() as Promise<Dict>;
}

export function pick(dict: Dict, section: string, key: string): string {
  return (dict[section]?.[key] as string) ?? key;
}
