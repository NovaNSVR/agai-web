import ContactForm from "@/components/ContactForm";
import type { FormField } from "@/components/ContactForm";
import { getServerT, LOCALES } from "@/utils/serverT";

const ROADMAP_ITEMS = [1, 2, 3, 4] as const;
const ALLOC_ITEMS = [1, 2, 3, 4] as const;

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export default async function InvestorsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getServerT(locale);

  const contactFields: FormField[] = [
    { name: "name", label: t("investors.formName"), type: "text", required: true },
    { name: "email", label: t("investors.formEmail"), type: "email", required: true },
    { name: "fund", label: t("investors.formFund"), type: "text" },
    { name: "message", label: t("investors.formMessage"), type: "textarea", required: true },
  ];

  return (
    <>
      {/* Hero — dark */}
      <section
        style={{
          background: "var(--dark-bg)",
          paddingTop: "clamp(5rem,10vw,8rem)",
          paddingBottom: "clamp(4rem,8vw,7rem)",
          borderBottom: "1px solid var(--dark-divider)",
        }}
        className="container-pad"
      >
        <div className="max-w-content mx-auto">
          <p className="font-sans uppercase mb-4" style={{ color: "var(--gold)", fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>
            {t("investors.badge")}
          </p>
          <h1 className="font-serif" style={{ color: "var(--dark-ink)", fontSize: "clamp(2.25rem,5vw,3.5rem)", lineHeight: 1.12, letterSpacing: "-0.018em", maxWidth: 780, marginBottom: "1.5rem" }}>
            {t("investors.heroHeading")}
          </h1>
          <p className="font-sans" style={{ color: "var(--dark-muted)", fontSize: "clamp(1rem,2vw,1.125rem)", lineHeight: 1.7, maxWidth: 600 }}>
            {t("investors.heroBody")}
          </p>
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="font-sans uppercase mb-3" style={{ color: "var(--terracotta)", fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>{t("investors.visionBadge")}</p>
              <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.25rem,2.5vw,1.75rem)" }}>{t("investors.visionHeading")}</h2>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("investors.visionBody")}</p>
            </div>
            <div>
              <p className="font-sans uppercase mb-3" style={{ color: "var(--terracotta)", fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>{t("investors.missionBadge")}</p>
              <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.25rem,2.5vw,1.75rem)" }}>{t("investors.missionHeading")}</h2>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("investors.missionBody")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.roadmapHeading")}</h2>
          <div className="grid gap-10 md:grid-cols-4">
            {ROADMAP_ITEMS.map((n) => (
              <div key={n}>
                <span className="font-sans font-tabular block mb-3" style={{ color: "var(--terracotta)", fontSize: "0.75rem", letterSpacing: "0.08em", fontWeight: 500 }}>
                  {t(`investors.roadmap${n}Num`)}
                </span>
                <h3 className="font-serif text-ink mb-2" style={{ fontSize: "1.0625rem", fontWeight: 400 }}>{t(`investors.roadmap${n}Title`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{t(`investors.roadmap${n}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NSVX Tokenomics */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.tokenomicsHeading")}</h2>
          <p className="font-sans text-muted mb-12" style={{ fontSize: "0.9375rem", lineHeight: 1.7, maxWidth: 580 }}>{t("investors.tokenomicsBody")}</p>
          <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", background: "var(--divider)", border: "1px solid var(--divider)" }}>
            {ALLOC_ITEMS.map((n) => (
              <div key={n} className="bg-surface" style={{ padding: "1.75rem" }}>
                <span className="font-sans font-tabular block mb-2" style={{ color: "var(--amber)", fontSize: "1.75rem", fontWeight: 500 }}>
                  {t(`investors.allocPct${n}`)}
                </span>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>{t(`investors.allocLabel${n}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-10" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.teamHeading")}</h2>
          <div className="border border-divider rounded bg-bg" style={{ padding: "2rem", maxWidth: 500 }}>
            <h3 className="font-serif text-ink mb-1" style={{ fontSize: "1.125rem", fontWeight: 400 }}>{t("investors.team1Name")}</h3>
            <p className="font-sans text-terracotta mb-4" style={{ fontSize: "0.8125rem", letterSpacing: "0.04em" }}>{t("investors.team1Role")}</p>
            <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>{t("investors.team1Bio")}</p>
          </div>
        </div>
      </section>

      {/* Whitepaper + Press kit */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-divider rounded bg-surface" style={{ padding: "2rem" }}>
              <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.125rem", fontWeight: 400 }}>{t("investors.whitepaperHeading")}</h3>
              <p className="font-sans text-muted mb-5" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>{t("investors.whitepaperBody")}</p>
              <span className="font-sans text-muted uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>{t("investors.whitepaperCta")}</span>
            </div>
            <div className="border border-divider rounded bg-surface" style={{ padding: "2rem" }}>
              <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.125rem", fontWeight: 400 }}>{t("investors.pressKitHeading")}</h3>
              <p className="font-sans text-muted mb-5" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>{t("investors.pressKitBody")}</p>
              <span className="font-sans text-muted uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>{t("investors.pressKitCta")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Referrals */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <p className="font-sans uppercase mb-3" style={{ color: "var(--terracotta)", fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>{t("investors.referralsBadge")}</p>
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.25rem,2.5vw,1.75rem)", maxWidth: 680, lineHeight: 1.3 }}>{t("investors.referralsHeading")}</h2>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75, maxWidth: 620 }}>{t("investors.referralsBody")}</p>
        </div>
      </section>

      {/* Contact form */}
      <section className="container-pad section-pad">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.contactHeading")}</h2>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("investors.contactBody")}</p>
            </div>
            <ContactForm
              formName="investor-enquiry"
              fields={contactFields}
              submitLabel={t("investors.formSubmit")}
              successMessage={t("investors.formSuccess")}
            />
          </div>
        </div>
      </section>
    </>
  );
}
