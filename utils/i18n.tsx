"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { SUPPORTED_LOCALES, type Locale, LOCALE_NAMES } from "./locales";

export { SUPPORTED_LOCALES, type Locale, LOCALE_NAMES };

type FlatMessages = Record<string, string>;

function flatten(obj: Record<string, unknown>, prefix = ""): FlatMessages {
  const result: FlatMessages = {};
  for (const key in obj) {
    const path = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(result, flatten(val as Record<string, unknown>, path));
    } else {
      result[path] = String(val);
    }
  }
  return result;
}

const messageCache: Partial<Record<Locale, FlatMessages>> = {};

async function loadMessages(locale: Locale): Promise<FlatMessages> {
  if (messageCache[locale]) return messageCache[locale]!;
  try {
    const mod = await import(`../locales/${locale}.json`);
    const flat = flatten(mod.default || mod);
    messageCache[locale] = flat;
    return flat;
  } catch {
    if (locale !== "en") return loadMessages("en");
    return {};
  }
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  ready: boolean;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
  ready: false,
});

// Adapted provider: locale comes from URL param (not auto-detected).
// setLocale sets cookie + navigates to same path in new locale.
export function I18nProvider({
  children,
  locale: initialLocale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const [messages, setMessages] = useState<FlatMessages>({});
  const [fallback, setFallback] = useState<FlatMessages>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [msgs, fb] = await Promise.all([
        loadMessages(initialLocale),
        initialLocale !== "en" ? loadMessages("en") : Promise.resolve({}),
      ]);
      if (cancelled) return;
      setMessages(msgs);
      setFallback(fb);
      setReady(true);
    })();
    return () => { cancelled = true; };
  }, [initialLocale]);

  const setLocale = (l: Locale) => {
    // Persist to cookie (1 year)
    document.cookie = `ag-locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    // Navigate to same path in new locale
    const segments = window.location.pathname.split("/").filter(Boolean);
    if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0] as Locale)) {
      segments[0] = l;
    } else {
      segments.unshift(l);
    }
    const rest = window.location.search + window.location.hash;
    window.location.href = "/" + segments.join("/") + rest;
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = messages[key] ?? fallback[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }
    return text;
  };

  return (
    <I18nContext.Provider value={{ locale: initialLocale, setLocale, t, ready }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
