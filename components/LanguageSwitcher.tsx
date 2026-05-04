"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n, SUPPORTED_LOCALES, LOCALE_NAMES, type Locale } from "@/utils/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="font-sans text-muted hover:text-ink transition-colors flex items-center gap-1.5"
        style={{ fontSize: "0.8125rem", background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}
      >
        {/* Globe icon */}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25"/>
          <path d="M8 1c-2 2-3 4.5-3 7s1 5 3 7M8 1c2 2 3 4.5 3 7s-1 5-3 7M1 8h14" stroke="currentColor" strokeWidth="1.25"/>
        </svg>
        <span className="uppercase font-tabular" style={{ letterSpacing: "0.05em" }}>
          {locale}
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 mt-1 bg-surface border border-divider rounded overflow-hidden z-50"
          style={{ minWidth: 160, top: "100%" }}
        >
          {SUPPORTED_LOCALES.map((l) => (
            <button
              key={l}
              role="option"
              aria-selected={l === locale}
              onClick={() => { setLocale(l as Locale); setOpen(false); }}
              className="w-full text-left font-sans transition-colors"
              style={{
                fontSize: "0.8125rem",
                padding: "9px 14px",
                background: l === locale ? "var(--bg)" : "var(--surface)",
                color: l === locale ? "var(--ink)" : "var(--muted)",
                fontWeight: l === locale ? 500 : 400,
                border: "none",
                cursor: "pointer",
                display: "flex",
                gap: 8,
                alignItems: "center",
                borderBottom: "1px solid var(--divider)",
              }}
            >
              <span
                className="uppercase font-tabular"
                style={{ width: 24, letterSpacing: "0.05em", flexShrink: 0 }}
              >
                {l}
              </span>
              <span>{LOCALE_NAMES[l as Locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
