"use client";

import Link from "next/link";
import { useI18n } from "@/utils/i18n";

const FEATURE_IDS = ["memory", "experts", "nsvx", "noNoise", "modalities", "offline"] as const;
const STEP_IDS = [1, 2, 3, 4] as const;

export default function ForListenersPage() {
  const { t, locale } = useI18n();

  return (
    <>
      <section className="container-pad" style={{ paddingTop: "clamp(5rem,10vw,8rem)", paddingBottom: "clamp(4rem,8vw,7rem)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <p className="font-sans text-terracotta uppercase mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>{t("forListeners.badge")}</p>
          <h1 className="font-serif text-ink" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", lineHeight: 1.12, letterSpacing: "-0.018em", maxWidth: 680, marginBottom: "1.5rem" }}>
            {t("forListeners.heroHeading")}
          </h1>
          <p className="font-sans text-muted" style={{ fontSize: "clamp(1rem,2vw,1.125rem)", lineHeight: 1.7, maxWidth: 520, marginBottom: "2.5rem" }}>
            {t("forListeners.heroBody")}
          </p>
          <Link href="https://alphaglowai.app" className="font-sans no-underline text-surface rounded inline-block" style={{ backgroundColor: "var(--terracotta)", fontSize: "0.9375rem", fontWeight: 500, padding: "14px 28px" }}>
            {t("forListeners.heroCta")}
          </Link>
        </div>
      </section>

      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("forListeners.stepsHeading")}</h2>
          <div className="grid gap-10 md:grid-cols-4">
            {STEP_IDS.map((n) => (
              <div key={n}>
                <span className="font-sans text-muted font-tabular block mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>{t(`forListeners.step${n}Num`)}</span>
                <h3 className="font-serif text-ink mb-2" style={{ fontSize: "1.0625rem", fontWeight: 400 }}>{t(`forListeners.step${n}Title`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{t(`forListeners.step${n}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("forListeners.featuresHeading")}</h2>
          <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", background: "var(--divider)", border: "1px solid var(--divider)" }}>
            {FEATURE_IDS.map((id) => (
              <div key={id} className="bg-surface" style={{ padding: "2rem 1.75rem" }}>
                <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.0625rem", fontWeight: 400 }}>{t(`forListeners.${id}Title`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{t(`forListeners.${id}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad section-pad">
        <div className="max-w-content mx-auto text-center" style={{ maxWidth: 560 }}>
          <h2 className="font-serif text-ink mb-3" style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)" }}>{t("forListeners.ctaHeading")}</h2>
          <p className="font-sans text-muted mb-8" style={{ fontSize: "1rem", lineHeight: 1.7 }}>{t("forListeners.ctaBody")}</p>
          <Link href="https://alphaglowai.app" className="font-sans no-underline text-surface rounded inline-block" style={{ backgroundColor: "var(--terracotta)", fontSize: "1rem", fontWeight: 500, padding: "16px 36px" }}>
            {t("forListeners.ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
