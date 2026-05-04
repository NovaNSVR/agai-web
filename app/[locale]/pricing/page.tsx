"use client";

import Link from "next/link";
import { useI18n } from "@/utils/i18n";

const STARTER_FEATURES = ["F1", "F2", "F3", "F4", "F5"] as const;
const CORE_FEATURES = ["F1", "F2", "F3", "F4", "F5", "F6"] as const;
const CREATOR_FEATURES = ["F1", "F2", "F3", "F4", "F5", "F6"] as const;

export default function PricingPage() {
  const { t, locale } = useI18n();
  const l = (path: string) => `/${locale}${path}`;

  const tiers = [
    {
      prefix: "starter",
      price: "Free",
      period: t("pricing.periodForever"),
      features: STARTER_FEATURES,
      href: "https://alphaglowai.app",
      highlight: false,
    },
    {
      prefix: "core",
      price: "$9",
      period: t("pricing.periodPerMonth"),
      features: CORE_FEATURES,
      href: "https://alphaglowai.app",
      highlight: true,
    },
    {
      prefix: "creator",
      price: "Free",
      period: t("pricing.periodToApply"),
      features: CREATOR_FEATURES,
      href: "https://alphaglowai.app/creator-onboarding",
      highlight: false,
    },
  ] as const;

  return (
    <>
      <section className="container-pad" style={{ paddingTop: "clamp(5rem,10vw,8rem)", paddingBottom: "clamp(4rem,8vw,7rem)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h1 className="font-serif text-ink" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", lineHeight: 1.12, letterSpacing: "-0.018em", maxWidth: 600, marginBottom: "1rem" }}>
            {t("pricing.heroHeading")}
          </h1>
          <p className="font-sans text-muted" style={{ fontSize: "clamp(1rem,2vw,1.125rem)", lineHeight: 1.7, maxWidth: 480 }}>
            {t("pricing.heroBody")}
          </p>
        </div>
      </section>

      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map(({ prefix, price, period, features, href, highlight }) => (
              <div key={prefix} className="flex flex-col bg-surface border rounded" style={{ borderColor: highlight ? "var(--terracotta)" : "var(--divider)", padding: "2rem" }}>
                {highlight && (
                  <span className="font-sans text-terracotta uppercase mb-4 block" style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", fontWeight: 500 }}>
                    {t("pricing.popularBadge")}
                  </span>
                )}
                <h2 className="font-serif text-ink mb-1" style={{ fontSize: "1.25rem", fontWeight: 400 }}>{t(`pricing.${prefix}Name`)}</h2>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-sans text-ink font-tabular" style={{ fontSize: "2rem", fontWeight: 600 }}>{price}</span>
                  <span className="font-sans text-muted" style={{ fontSize: "0.8125rem" }}>{period}</span>
                </div>
                <p className="font-sans text-muted mb-6" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>{t(`pricing.${prefix}Desc`)}</p>
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="font-sans text-moss mt-0.5" style={{ fontSize: "0.875rem", flexShrink: 0 }}>+</span>
                      <span className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.55 }}>{t(`pricing.${prefix}${f}`)}</span>
                    </li>
                  ))}
                </ul>
                <Link href={href} className="font-sans no-underline rounded text-center" style={{ backgroundColor: highlight ? "var(--terracotta)" : "transparent", color: highlight ? "white" : "var(--ink)", border: highlight ? "none" : "1px solid var(--divider)", fontSize: "0.9375rem", fontWeight: 500, padding: "12px 20px" }}>
                  {t(`pricing.${prefix}Cta`)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad section-pad">
        <div className="max-w-content mx-auto" style={{ maxWidth: 680 }}>
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("pricing.nsvxCalloutHeading")}</h2>
          <p className="font-sans text-muted mb-4" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>{t("pricing.nsvxCalloutP1")}</p>
          <p className="font-sans text-muted mb-6" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>{t("pricing.nsvxCalloutP2")}</p>
          <Link href={l("/how-nsvx-works")} className="font-sans text-terracotta no-underline hover:underline" style={{ fontSize: "0.9375rem", textUnderlineOffset: "3px" }}>
            {t("pricing.nsvxCalloutLink")}
          </Link>
        </div>
      </section>
    </>
  );
}
