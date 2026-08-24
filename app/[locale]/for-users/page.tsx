import Link from "next/link";
import FAQ from "@/components/FAQ";
import { getServerT, LOCALES } from "@/utils/serverT";
import { buildPageMetadata } from "@/utils/seo";

const FEATURES = ["memory", "programs", "nsvxFeature", "noNoise", "modalities", "offline"] as const;
const EARN_ITEMS = [1, 2, 3] as const;

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return buildPageMetadata(locale, "for-users");
}


export default async function ForUsersPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getServerT(locale);
  const l = (path: string) => `/${locale}${path}`;
  const app = (path = "") => `https://alphaglowai.app${path}?lang=${locale}`;

  const faqItems = [1, 2, 3, 4, 5].map((n) => ({
    q: t(`forUsers.faq${n}Q`),
    a: t(`forUsers.faq${n}A`),
  }));

  return (
    <>
      {/* Hero */}
      <section className="container-pad" style={{ paddingTop: "clamp(5rem,10vw,8rem)", paddingBottom: "clamp(4rem,8vw,7rem)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <p className="font-sans text-terracotta uppercase mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>{t("forUsers.badge")}</p>
          <h1 className="font-serif text-ink" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", lineHeight: 1.12, letterSpacing: "-0.018em", maxWidth: 700, marginBottom: "1.5rem" }}>
            {t("forUsers.heroHeading")}
          </h1>
          <p className="font-sans text-muted" style={{ fontSize: "clamp(1rem,2vw,1.125rem)", lineHeight: 1.7, maxWidth: 540, marginBottom: "2.5rem" }}>
            {t("forUsers.heroBody")}
          </p>
          <Link href={l("/signup")} className="font-sans no-underline text-surface rounded inline-block" style={{ backgroundColor: "var(--terracotta)", fontSize: "0.9375rem", fontWeight: 500, padding: "14px 28px" }}>
            {t("forUsers.heroCta")}
          </Link>
        </div>
      </section>

      {/* What AlphaGlow is — three explainer cards */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("forUsers.whatHeading")}</h2>
          <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", background: "var(--divider)", border: "1px solid var(--divider)" }}>
            {(["sessions", "journeys", "dt", "pulse"] as const).map((id) => (
              <div key={id} className="bg-surface" style={{ padding: "2rem 1.75rem" }}>
                <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.125rem", fontWeight: 400 }}>{t(`forUsers.${id}Title`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>{t(`forUsers.${id}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nova */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("forUsers.novaHeading")}</h2>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("forUsers.novaBody")}</p>
              <div className="mt-6">
                <Link href={l("/nova")} className="font-sans text-terracotta no-underline hover:underline" style={{ fontSize: "0.875rem", textUnderlineOffset: "3px" }}>
                  {t("forUsers.novaLearnMore")}
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {(["novaFeature1", "novaFeature2", "novaFeature3"] as const).map((id) => (
                <div key={id} className="border-l-2 border-terracotta" style={{ paddingLeft: "1.25rem" }}>
                  <h3 className="font-serif text-ink mb-2" style={{ fontSize: "1rem", fontWeight: 400 }}>{t(`forUsers.${id}Title`)}</h3>
                  <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{t(`forUsers.${id}Body`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NSVX earn */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("forUsers.earnHeading")}</h2>
          <p className="font-sans text-muted mb-12" style={{ fontSize: "0.9375rem", lineHeight: 1.7, maxWidth: 560 }}>{t("forUsers.earnBody")}</p>
          <div className="grid gap-10 md:grid-cols-3">
            {EARN_ITEMS.map((n) => (
              <div key={n}>
                <span className="font-sans text-muted font-tabular block mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>
                  0{n}
                </span>
                <h3 className="font-serif text-ink mb-2" style={{ fontSize: "1.125rem", fontWeight: 400 }}>{t(`forUsers.earn${n}Title`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{t(`forUsers.earn${n}Body`)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href={l("/nsvx")} className="font-sans text-terracotta no-underline hover:underline" style={{ fontSize: "0.875rem", textUnderlineOffset: "3px" }}>
              {t("forUsers.nsvxLearnMore")}
            </Link>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("forUsers.featuresHeading")}</h2>
          <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", background: "var(--divider)", border: "1px solid var(--divider)" }}>
            {FEATURES.map((id) => (
              <div key={id} className="bg-surface" style={{ padding: "2rem 1.75rem" }}>
                <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.0625rem", fontWeight: 400 }}>{t(`forUsers.${id}Title`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{t(`forUsers.${id}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="border border-divider rounded bg-surface" style={{ padding: "clamp(2rem,5vw,3rem)", maxWidth: 600 }}>
            <h2 className="font-serif text-ink mb-3" style={{ fontSize: "clamp(1.25rem,2.5vw,1.75rem)" }}>{t("forUsers.pricingHeading")}</h2>
            <p className="font-sans text-muted mb-6" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>{t("forUsers.pricingBody")}</p>
            <Link href={l("/pricing")} className="font-sans text-terracotta no-underline hover:underline" style={{ fontSize: "0.875rem", textUnderlineOffset: "3px" }}>
              {t("forUsers.pricingLink")}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-10" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("forUsers.faqHeading")}</h2>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="container-pad section-pad">
        <div className="max-w-content mx-auto text-center" style={{ maxWidth: 560 }}>
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)" }}>{t("forUsers.ctaHeading")}</h2>
          <p className="font-sans text-muted mb-8" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>{t("forUsers.ctaBody")}</p>
          <Link href={l("/signup")} className="font-sans no-underline text-surface rounded inline-block" style={{ backgroundColor: "var(--terracotta)", fontSize: "1rem", fontWeight: 500, padding: "16px 36px" }}>
            {t("forUsers.ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
