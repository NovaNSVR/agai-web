"use client";

import Link from "next/link";
import { useI18n } from "@/utils/i18n";

const ARCHETYPE_IDS = [
  "movement", "meditation", "nutrition", "sleep", "resilience", "sound",
] as const;

const COMPARISON_IDS = ["patreon", "substack", "insightTimer"] as const;
const COMPARISON_LABELS = { patreon: "Patreon", substack: "Substack", insightTimer: "Insight Timer" };

export default function HomePage() {
  const { t, locale } = useI18n();
  const l = (path: string) => `/${locale}${path}`;

  return (
    <>
      {/* Hero */}
      <section className="container-pad" style={{ paddingTop: "clamp(5rem,12vw,9rem)", paddingBottom: "clamp(5rem,12vw,9rem)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div style={{ maxWidth: 720 }}>
            <p className="font-sans text-terracotta uppercase mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>
              {t("home.badge")}
            </p>
            <h1 className="font-serif text-ink" style={{ fontSize: "clamp(2.5rem,6vw,4rem)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem", textWrap: "balance" }}>
              {t("home.heroHeading")}
            </h1>
            <p className="font-sans text-muted" style={{ fontSize: "clamp(1rem,2vw,1.2rem)", lineHeight: 1.7, maxWidth: 560, marginBottom: "2.5rem" }}>
              {t("home.heroBody")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="https://alphaglowai.app" className="font-sans no-underline text-surface rounded" style={{ backgroundColor: "var(--terracotta)", fontSize: "0.9375rem", fontWeight: 500, padding: "14px 28px" }}>
                {t("home.heroCtaApp")}
              </Link>
              <Link href={l("/for-creators")} className="font-sans no-underline text-ink rounded border border-divider" style={{ fontSize: "0.9375rem", padding: "14px 28px" }}>
                {t("home.heroCtaCreators")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Creator archetype grid */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="mb-12">
            <h2 className="font-serif text-ink" style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)", marginBottom: "0.75rem" }}>
              {t("home.archetypesHeading")}
            </h2>
            <p className="font-sans text-muted" style={{ fontSize: "1rem", maxWidth: 520 }}>
              {t("home.archetypesBody")}
            </p>
          </div>
          <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", background: "var(--divider)", border: "1px solid var(--divider)" }}>
            {ARCHETYPE_IDS.map((id) => (
              <div key={id} className="bg-surface" style={{ padding: "2rem 1.75rem" }}>
                <span className="font-sans text-terracotta uppercase block mb-3" style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", fontWeight: 500 }}>
                  {t(`home.${id}Category`)}
                </span>
                <h3 className="font-serif text-ink mb-2" style={{ fontSize: "1.125rem", fontWeight: 400 }}>
                  {t(`home.${id}Title`)}
                </h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>
                  {t(`home.${id}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NSVX 3-step */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="mb-12">
            <h2 className="font-serif text-ink" style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)", marginBottom: "0.75rem" }}>
              {t("home.nsvxHeading")}
            </h2>
            <p className="font-sans text-muted" style={{ fontSize: "1rem", maxWidth: 520 }}>
              {t("home.nsvxBody")}
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {([1, 2, 3] as const).map((n) => (
              <div key={n}>
                <span className="font-sans text-muted font-tabular block mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>
                  {t(`home.nsvxStep${n}Num`)}
                </span>
                <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.25rem", fontWeight: 400 }}>
                  {t(`home.nsvxStep${n}Title`)}
                </h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                  {t(`home.nsvxStep${n}Body`)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href={l("/how-nsvx-works")} className="font-sans text-terracotta no-underline hover:underline" style={{ fontSize: "0.9375rem", textUnderlineOffset: "3px" }}>
              {t("home.nsvxLearnMore")}
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="mb-12">
            <h2 className="font-serif text-ink" style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}>
              {t("home.comparisonHeading")}
            </h2>
          </div>
          <div className="border border-divider rounded overflow-hidden">
            <div className="grid font-sans text-muted uppercase" style={{ gridTemplateColumns: "1fr 1fr 1fr", fontSize: "0.6875rem", letterSpacing: "0.1em", padding: "0.75rem 1.5rem", background: "var(--bg)", borderBottom: "1px solid var(--divider)" }}>
              <span>{t("home.comparisonColPlatform")}</span>
              <span>{t("home.comparisonColThem")}</span>
              <span>{t("home.comparisonColUs")}</span>
            </div>
            {COMPARISON_IDS.map((id, i) => (
              <div key={id} className="grid bg-surface" style={{ gridTemplateColumns: "1fr 1fr 1fr", padding: "1.25rem 1.5rem", gap: "1rem", borderBottom: i < COMPARISON_IDS.length - 1 ? "1px solid var(--divider)" : undefined, alignItems: "start" }}>
                <span className="font-sans text-ink font-tabular" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  {COMPARISON_LABELS[id]}
                </span>
                <span className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.55 }}>
                  {t(`home.${id}Them`)}
                </span>
                <span className="font-sans text-moss" style={{ fontSize: "0.875rem", lineHeight: 1.55 }}>
                  {t(`home.${id}Us`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-pad section-pad">
        <div className="max-w-content mx-auto text-center" style={{ maxWidth: 600 }}>
          <h2 className="font-serif text-ink" style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", marginBottom: "1rem" }}>
            {t("home.ctaHeading")}
          </h2>
          <p className="font-sans text-muted mb-8" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
            {t("home.ctaBody")}
          </p>
          <Link href="https://alphaglowai.app" className="font-sans no-underline text-surface rounded inline-block" style={{ backgroundColor: "var(--terracotta)", fontSize: "1rem", fontWeight: 500, padding: "16px 36px" }}>
            {t("home.ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
