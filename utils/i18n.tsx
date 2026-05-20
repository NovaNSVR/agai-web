"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { SUPPORTED_LOCALES, type Locale, LOCALE_NAMES } from "./locales";
import { flatten, type FlatMessages } from "./flattenDict";

export { SUPPORTED_LOCALES, type Locale, LOCALE_NAMES };
export type { FlatMessages };

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

// initialMessages: SSG-time pre-loaded translations passed from server component.
// This eliminates the raw-key flash on first render — the static HTML will have
// actual text instead of key strings.
export function I18nProvider({
  children,
  locale: initialLocale,
  initialMessages = {},
}: {
  children: ReactNode;
  locale: Locale;
  initialMessages?: FlatMessages;
}) {
  const hasInitial = Object.keys(initialMessages).length > 0;

  const [messages, setMessages] = useState<FlatMessages>(initialMessages);
  const [fallback, setFallback] = useState<FlatMessages>({});
  const [ready, setReady] = useState(hasInitial);

  useEffect(() => {
    // Seed the cache with SSG-provided messages so the dynamic import is a cache hit.
    if (hasInitial && !messageCache[initialLocale]) {
      messageCache[initialLocale] = initialMessages;
    }

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
  }, [initialLocale]); // eslint-disable-line react-hooks/exhaustive-deps

  const setLocale = (l: Locale) => {
    document.cookie = `ag-locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
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
