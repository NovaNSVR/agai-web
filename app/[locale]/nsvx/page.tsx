import Link from "next/link";
import FAQ from "@/components/FAQ";
import { getServerT, LOCALES } from "@/utils/serverT";
import BuyNotifyForm from "@/components/BuyNotifyForm";

const EARN_ITEMS = [6] as const;
const SPEND_ITEMS = [1, 2] as const;

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export default async function NsvxPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getServerT(locale);
  const l = (path: string) => `/${locale}${path}`;
  const app = (path = "") => `https://alphaglowai.app${path}?lang=${locale}`;

  const faqItems = [1, 2, 3, 4, 5].map((n) => ({
    q: t(`nsvxPage.faq${n}Q`),
    a: t(`nsvxPage.faq${n}A`),
  }));

  return (
    <>
      {/* Hero */}
      <section className="container-pad" style={{ paddingTop: "clamp(5rem,10vw,8rem)", paddingBottom: "clamp(4rem,8vw,7rem)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <p className="font-sans text-terracotta uppercase mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>{t("nsvxPage.badge")}</p>
          <h1 className="font-serif text-ink" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", lineHeight: 1.12, letterSpacing: "-0.018em", maxWidth: 700, marginBottom: "1.5rem" }}>
            {t("nsvxPage.heroHeading")}
          </h1>
          <p className="font-sans text-muted" style={{ fontSize: "clamp(1rem,2vw,1.125rem)", lineHeight: 1.7, maxWidth: 540 }}>
            {t("nsvxPage.heroBody")}
          </p>
        </div>
      </section>

      {/* What is NSVX */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("nsvxPage.whatHeading")}</h2>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("nsvxPage.whatBody")}</p>
            </div>
            <div className="border border-divider rounded bg-bg" style={{ padding: "2rem" }}>
              <p className="font-sans uppercase mb-4" style={{ color: "var(--terracotta)", fontSize: "0.6875rem", letterSpacing: "0.12em", fontWeight: 500 }}>Solana blockchain</p>
              <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.75 }}>{t("nsvxPage.solanaBody")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Earn */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("nsvxPage.earnHeading")}</h2>
          <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", background: "var(--divider)", border: "1px solid var(--divider)" }}>
            {EARN_ITEMS.map((n) => (
              <div key={n} className="bg-surface" style={{ padding: "1.75rem" }}>
                <h3 className="font-serif text-ink mb-2" style={{ fontSize: "1.0625rem", fontWeight: 400 }}>{t(`nsvxPage.earn${n}Title`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{t(`nsvxPage.earn${n}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy — Moonpay placeholder */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("nsvxPage.buyHeading")}</h2>
          <p className="font-sans text-muted mb-8" style={{ fontSize: "0.9375rem", lineHeight: 1.7, maxWidth: 540 }}>{t("nsvxPage.buyBody")}</p>
          {/* Moonpay widget placeholder */}
          <div
            className="border border-divider rounded"
            style={{ maxWidth: 460, padding: "2.5rem 2rem", background: "var(--bg)", textAlign: "center" }}
          >
            <p className="font-sans text-muted mb-6" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>{t("nsvxPage.buyNote")}</p>
            <BuyNotifyForm
              notifyLabel={t("nsvxPage.buyNotifyLabel")}
              notifyCta={t("nsvxPage.buyNotifyCta")}
              notifySuccess={t("nsvxPage.buyNotifySuccess")}
            />
          </div>
        </div>
      </section>

      {/* Spend */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("nsvxPage.spendHeading")}</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {SPEND_ITEMS.map((n) => (
              <div key={n}>
                <span className="font-sans text-muted font-tabular block mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>0{n}</span>
                <h3 className="font-serif text-ink mb-2" style={{ fontSize: "1.125rem", fontWeight: 400 }}>{t(`nsvxPage.spend${n}Title`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{t(`nsvxPage.spend${n}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Withdraw */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <div className="border border-divider rounded bg-bg" style={{ padding: "clamp(2rem,5vw,3rem)", maxWidth: 600 }}>
            <h2 className="font-serif text-ink mb-3" style={{ fontSize: "clamp(1.25rem,2.5vw,1.75rem)" }}>{t("nsvxPage.withdrawHeading")}</h2>
            <p className="font-sans text-muted mb-4" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>{t("nsvxPage.withdrawBody")}</p>
            <span className="font-sans text-muted uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>{t("nsvxPage.withdrawComingSoon")}</span>
          </div>
        </div>
      </section>

      {/* Token economics */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("nsvxPage.economicsHeading")}</h2>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75, maxWidth: 600 }}>{t("nsvxPage.economicsBody")}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-10" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("nsvxPage.faqHeading")}</h2>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* Legal note */}
      <section className="container-pad" style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 680 }}>
          <div className="border border-divider rounded" style={{ padding: "1.25rem 1.5rem" }}>
            <p className="font-sans text-muted" style={{ fontSize: "0.8125rem", lineHeight: 1.75 }}>{t("nsvxPage.legalNote")}</p>
            <Link href={l("/legal/nsvx-disclaimer")} className="font-sans text-terracotta no-underline hover:underline" style={{ fontSize: "0.8125rem", textUnderlineOffset: "3px" }}>
              {t("nsvxPage.legalLink")}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-pad section-pad">
        <div className="max-w-content mx-auto text-center" style={{ maxWidth: 480 }}>
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)" }}>{t("nsvxPage.ctaHeading")}</h2>
          <p className="font-sans text-muted mb-8" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>{t("nsvxPage.ctaBody")}</p>
          <Link href={l("/signup")} className="font-sans no-underline text-surface rounded inline-block" style={{ backgroundColor: "var(--terracotta)", fontSize: "1rem", fontWeight: 500, padding: "16px 36px" }}>
            {t("nsvxPage.ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
