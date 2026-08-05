import Link from "next/link";
import { getServerT, LOCALES } from "@/utils/serverT";
import { buildPageMetadata } from "@/utils/seo";

const HOW_ITEMS = [1, 2, 3] as const;
const LEARNS_ITEMS = [1, 2, 3, 4, 5] as const;
const PRIVACY_ITEMS = [1, 2, 3, 4] as const;

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return buildPageMetadata(locale, "nova");
}


export default async function NovaPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getServerT(locale);
  const l = (path: string) => `/${locale}${path}`;
  const app = (path = "") => `https://alphaglowai.app${path}?lang=${locale}`;

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "#FAFAF7",
          paddingTop: "clamp(5rem,10vw,8rem)",
          paddingBottom: "clamp(4rem,8vw,7rem)",
          borderBottom: "1px solid var(--divider)",
        }}
        className="container-pad"
      >
        <div className="max-w-content mx-auto">
          <p className="font-sans text-terracotta uppercase mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>
            {t("novaPage.badge")}
          </p>
          <h1 className="font-serif text-ink" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", lineHeight: 1.12, letterSpacing: "-0.018em", maxWidth: 680, marginBottom: "1.5rem" }}>
            {t("novaPage.heroHeading")}
          </h1>
          <p className="font-sans text-muted" style={{ fontSize: "clamp(1rem,2vw,1.125rem)", lineHeight: 1.7, maxWidth: 540 }}>
            {t("novaPage.heroBody")}
          </p>
        </div>
      </section>

      {/* What Nova is */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("novaPage.whatHeading")}</h2>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("novaPage.whatBody")}</p>
            </div>
            <div className="border border-divider rounded bg-surface" style={{ padding: "2rem" }}>
              <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.75 }}>
                {t("novaPage.whatCallout")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How she works */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("novaPage.howHeading")}</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {HOW_ITEMS.map((n) => (
              <div key={n}>
                <span className="font-sans text-muted font-tabular block mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>0{n}</span>
                <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.125rem", fontWeight: 400 }}>{t(`novaPage.how${n}Title`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>{t(`novaPage.how${n}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What she learns */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("novaPage.learnsHeading")}</h2>
          <p className="font-sans text-muted mb-12" style={{ fontSize: "0.9375rem", lineHeight: 1.7, maxWidth: 560 }}>{t("novaPage.learnsBody")}</p>
          <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", background: "var(--divider)", border: "1px solid var(--divider)" }}>
            {LEARNS_ITEMS.map((n) => (
              <div key={n} className="bg-surface" style={{ padding: "2rem 1.75rem" }}>
                <h3 className="font-serif text-ink mb-2" style={{ fontSize: "1.0625rem", fontWeight: 400 }}>{t(`novaPage.learns${n}Title`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{t(`novaPage.learns${n}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("novaPage.privacyHeading")}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {PRIVACY_ITEMS.map((n) => (
              <div key={n}>
                <h3 className="font-serif text-ink mb-2" style={{ fontSize: "1.0625rem", fontWeight: 400 }}>{t(`novaPage.privacy${n}Title`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>{t(`novaPage.privacy${n}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard link */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="border border-divider rounded bg-surface" style={{ padding: "clamp(2rem,5vw,3rem)", maxWidth: 640 }}>
            <h2 className="font-serif text-ink mb-3" style={{ fontSize: "clamp(1.25rem,2.5vw,1.75rem)" }}>{t("novaPage.dashboardHeading")}</h2>
            <p className="font-sans text-muted mb-6" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>{t("novaPage.dashboardBody")}</p>
            <Link href={app("/nova")} className="font-sans text-terracotta no-underline hover:underline" style={{ fontSize: "0.875rem", textUnderlineOffset: "3px" }}>
              {t("novaPage.dashboardLink")}
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container-pad" style={{ paddingTop: "clamp(3rem,6vw,5rem)", paddingBottom: "clamp(3rem,6vw,5rem)", borderBottom: "1px solid var(--divider)", background: "var(--bg)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 680 }}>
          <div className="border border-divider rounded" style={{ padding: "1.5rem 1.75rem" }}>
            <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1rem", fontWeight: 400 }}>{t("novaPage.disclaimerHeading")}</h3>
            <p className="font-sans text-muted" style={{ fontSize: "0.8125rem", lineHeight: 1.75 }}>{t("novaPage.disclaimerBody")}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-pad section-pad">
        <div className="max-w-content mx-auto text-center" style={{ maxWidth: 480 }}>
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)" }}>{t("novaPage.ctaHeading")}</h2>
          <p className="font-sans text-muted mb-8" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>{t("novaPage.ctaBody")}</p>
          <Link href={l("/signup")} className="font-sans no-underline text-surface rounded inline-block" style={{ backgroundColor: "var(--terracotta)", fontSize: "1rem", fontWeight: 500, padding: "16px 36px" }}>
            {t("novaPage.ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
