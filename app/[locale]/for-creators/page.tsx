import Link from "next/link";
import { getServerT, LOCALES } from "@/utils/serverT";
import { buildPageMetadata } from "@/utils/seo";

const BENEFIT_IDS = ["nova", "dt", "data", "discovery", "sound"] as const;
const STEP_IDS = [1, 2, 3, 4] as const;
const EXAMPLE_IDS = [1, 2, 3, 4, 5, 6] as const;

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return buildPageMetadata(locale, "for-creators");
}


export default async function ForCreatorsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getServerT(locale);
  const l = (path: string) => `/${locale}${path}`;
  const app = (path = "") => `https://alphaglowai.app${path}?lang=${locale}`;

  return (
    <>
      {/* Hero */}
      <section className="container-pad" style={{ paddingTop: "clamp(5rem,10vw,8rem)", paddingBottom: "clamp(4rem,8vw,7rem)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <p className="font-sans text-terracotta uppercase mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>{t("forCreators.badge")}</p>
          <h1 className="font-serif text-ink" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", lineHeight: 1.12, letterSpacing: "-0.018em", maxWidth: 700, marginBottom: "1.5rem" }}>
            {t("forCreators.heroHeading")}
          </h1>
          <p className="font-sans text-muted" style={{ fontSize: "clamp(1rem,2vw,1.125rem)", lineHeight: 1.7, maxWidth: 540, marginBottom: "2.5rem" }}>
            {t("forCreators.heroBody")}
          </p>
          <Link href={app("/creator-onboarding")} className="font-sans no-underline text-surface rounded inline-block" style={{ backgroundColor: "var(--terracotta)", fontSize: "0.9375rem", fontWeight: 500, padding: "14px 28px" }}>
            {t("forCreators.heroCta")}
          </Link>
        </div>
      </section>

      {/* 85% payout — highlighted */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("forCreators.payoutHeading")}</h2>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("forCreators.payoutBody")}</p>
            </div>
            <div className="border border-divider rounded bg-bg" style={{ padding: "2rem", textAlign: "center" }}>
              <span className="font-serif text-ink" style={{ fontSize: "4rem", fontWeight: 400, lineHeight: 1 }}>85%</span>
              <p className="font-sans text-muted mt-3" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{t("forCreators.payoutStat")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Twin for creators */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-sans text-terracotta uppercase mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>{t("forCreators.dtCreatorBadge")}</p>
              <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("forCreators.dtCreatorHeading")}</h2>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("forCreators.dtCreatorBody")}</p>
            </div>
            <div>
              <p className="font-sans text-terracotta uppercase mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>{t("forCreators.novaStudioBadge")}</p>
              <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("forCreators.novaStudioHeading")}</h2>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("forCreators.novaStudioBody")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Creator examples + open invitation */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <p className="font-sans text-muted uppercase mb-10" style={{ fontSize: "0.7rem", letterSpacing: "0.16em", fontWeight: 600 }}>{t("forCreators.examplesLabel")}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginBottom: "4rem" }}>
            {EXAMPLE_IDS.map((n, i) => (
              <div key={n} className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3 md:gap-10 items-start" style={{ paddingBottom: "2.5rem", borderBottom: i < EXAMPLE_IDS.length - 1 ? "1px solid var(--divider)" : undefined }}>
                <p className="font-sans text-terracotta md:pt-[0.2rem]" style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{t(`forCreators.example${n}Label`)}</p>
                <div>
                  <h3 className="font-serif text-ink mb-2" style={{ fontSize: "1.25rem", lineHeight: 1.25, letterSpacing: "-0.01em", fontWeight: 400 }}>{t(`forCreators.example${n}Headline`)}</h3>
                  <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>{t(`forCreators.example${n}Body`)}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 620 }}>
            <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", lineHeight: 1.2, letterSpacing: "-0.012em" }}>{t("forCreators.openInviteHeading")}</h2>
            <p className="font-sans text-muted mb-8" style={{ fontSize: "1rem", lineHeight: 1.8 }}>{t("forCreators.openInviteBody")}</p>
            <Link href={app("/creator-onboarding")} className="font-sans no-underline text-surface rounded inline-block" style={{ backgroundColor: "var(--terracotta)", fontSize: "0.9375rem", fontWeight: 500, padding: "14px 28px" }}>
              {t("forCreators.ctaApply")}
            </Link>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("forCreators.benefitsHeading")}</h2>
          <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", background: "var(--divider)", border: "1px solid var(--divider)" }}>
            {BENEFIT_IDS.map((id) => (
              <div key={id} className="bg-surface" style={{ padding: "2rem 1.75rem" }}>
                <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.0625rem", fontWeight: 400 }}>{t(`forCreators.${id}Title`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{t(`forCreators.${id}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("forCreators.stepsHeading")}</h2>
          <div className="grid gap-10 md:grid-cols-4">
            {STEP_IDS.map((n) => (
              <div key={n}>
                <span className="font-sans text-muted font-tabular block mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>{t(`forCreators.step${n}Num`)}</span>
                <h3 className="font-serif text-ink mb-2" style={{ fontSize: "1.0625rem", fontWeight: 400 }}>{t(`forCreators.step${n}Title`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{t(`forCreators.step${n}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-pad section-pad">
        <div className="max-w-content mx-auto">
          <div className="bg-surface border border-divider rounded" style={{ padding: "clamp(2.5rem,5vw,4rem)", maxWidth: 640 }}>
            <h2 className="font-serif text-ink mb-3" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("forCreators.ctaHeading")}</h2>
            <p className="font-sans text-muted mb-8" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>{t("forCreators.ctaBody")}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={app("/creator-onboarding")} className="font-sans no-underline text-surface rounded" style={{ backgroundColor: "var(--terracotta)", fontSize: "0.9375rem", fontWeight: 500, padding: "12px 24px" }}>
                {t("forCreators.ctaApply")}
              </Link>
              <Link href={l("/legal/creator-agreement")} className="font-sans no-underline text-muted border border-divider rounded hover:text-ink transition-colors" style={{ fontSize: "0.9375rem", padding: "12px 24px" }}>
                {t("forCreators.ctaAgreement")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
