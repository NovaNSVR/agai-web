import Link from "next/link";
import { getServerT, LOCALES } from "@/utils/serverT";
import { buildPageMetadata } from "@/utils/seo";

const EARN_IDS = ["CompleteSession", "Streak7", "Streak30", "FinishProgram", "ReferListener", "FirstCheckin"] as const;
const SPEND_IDS = ["PremiumProgram", "DigitalTwin", "Soundscape", "NovaTier"] as const;
const FAQ_IDS = [1, 2, 3, 4, 5] as const;

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return buildPageMetadata(locale, "how-nsvx-works");
}


export default async function HowNsvxWorksPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getServerT(locale);
  const l = (path: string) => `/${locale}${path}`;
  const app = (path = "") => `https://alphaglowai.app${path}?lang=${locale}`;

  return (
    <>
      <section className="container-pad" style={{ paddingTop: "clamp(5rem,10vw,8rem)", paddingBottom: "clamp(4rem,8vw,7rem)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <p className="font-sans text-terracotta uppercase mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>{t("howNsvx.badge")}</p>
          <h1 className="font-serif text-ink" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", lineHeight: 1.12, letterSpacing: "-0.018em", maxWidth: 640, marginBottom: "1.5rem" }}>
            {t("howNsvx.heroHeading")}
          </h1>
          <p className="font-sans text-muted" style={{ fontSize: "clamp(1rem,2vw,1.125rem)", lineHeight: 1.7, maxWidth: 520, marginBottom: "2.5rem" }}>
            {t("howNsvx.heroBody")}
          </p>
          <Link href={l("/signup")} className="font-sans no-underline text-surface rounded inline-block" style={{ backgroundColor: "var(--terracotta)", fontSize: "0.9375rem", fontWeight: 500, padding: "14px 28px" }}>
            {t("howNsvx.heroCta")}
          </Link>
        </div>
      </section>

      {/* Earn / Spend tables */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="font-serif text-ink mb-6" style={{ fontSize: "clamp(1.25rem,2.5vw,1.75rem)" }}>{t("howNsvx.earnHeading")}</h2>
              <div className="border border-divider rounded overflow-hidden">
                {EARN_IDS.map((id, i) => (
                  <div key={id} className="flex justify-between items-center bg-surface" style={{ padding: "1rem 1.25rem", borderBottom: i < EARN_IDS.length - 1 ? "1px solid var(--divider)" : undefined }}>
                    <span className="font-sans text-muted" style={{ fontSize: "0.875rem" }}>{t(`howNsvx.earn${id}`)}</span>
                    <span className="font-sans text-moss font-tabular" style={{ fontSize: "0.875rem", fontWeight: 500, whiteSpace: "nowrap" }}>{t(`howNsvx.earn${id}Val`)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-ink mb-6" style={{ fontSize: "clamp(1.25rem,2.5vw,1.75rem)" }}>{t("howNsvx.spendHeading")}</h2>
              <div className="border border-divider rounded overflow-hidden">
                {SPEND_IDS.map((id, i) => (
                  <div key={id} className="flex justify-between items-center bg-surface" style={{ padding: "1rem 1.25rem", borderBottom: i < SPEND_IDS.length - 1 ? "1px solid var(--divider)" : undefined }}>
                    <span className="font-sans text-muted" style={{ fontSize: "0.875rem" }}>{t(`howNsvx.spend${id}`)}</span>
                    <span className="font-sans text-terracotta font-tabular" style={{ fontSize: "0.875rem", fontWeight: 500, whiteSpace: "nowrap" }}>{t(`howNsvx.spend${id}Val`)}</span>
                  </div>
                ))}
              </div>
              <p className="font-sans text-muted mt-4" style={{ fontSize: "0.75rem", lineHeight: 1.6 }}>
                {t("howNsvx.spendDisclaimer", { nsvxLink: t("howNsvx.spendDisclaimerLink") })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creator flow */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("howNsvx.creatorFlowHeading")}</h2>
          <p className="font-sans text-muted mb-10" style={{ fontSize: "0.9375rem", lineHeight: 1.7, maxWidth: 600 }}>{t("howNsvx.creatorFlowBody")}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={l("/for-creators")} className="font-sans no-underline text-surface rounded" style={{ backgroundColor: "var(--terracotta)", fontSize: "0.875rem", fontWeight: 500, padding: "12px 22px" }}>
              {t("howNsvx.creatorFlowCtaCreator")}
            </Link>
            <Link href={l("/legal/creator-agreement")} className="font-sans no-underline text-muted border border-divider rounded hover:text-ink transition-colors" style={{ fontSize: "0.875rem", padding: "12px 22px" }}>
              {t("howNsvx.creatorFlowCtaAgreement")}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-pad section-pad">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-10" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("howNsvx.faqHeading")}</h2>
          <div className="flex flex-col gap-0 border border-divider rounded overflow-hidden" style={{ maxWidth: 720 }}>
            {FAQ_IDS.map((n, i) => (
              <div key={n} className="bg-surface" style={{ padding: "1.5rem 1.75rem", borderBottom: i < FAQ_IDS.length - 1 ? "1px solid var(--divider)" : undefined }}>
                <h3 className="font-serif text-ink mb-2" style={{ fontSize: "1rem", fontWeight: 400 }}>{t(`howNsvx.faq${n}Q`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{t(`howNsvx.faq${n}A`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
