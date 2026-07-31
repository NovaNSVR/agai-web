import ContactForm from "@/components/ContactForm";
import type { FormField } from "@/components/ContactForm";
import { getServerT, LOCALES } from "@/utils/serverT";

const ROADMAP_ITEMS = [1, 2, 3, 4] as const;

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
            {t("investors.badge")}
          </p>
          <h1 className="font-serif text-ink" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", lineHeight: 1.12, letterSpacing: "-0.018em", maxWidth: 780, marginBottom: "1.5rem" }}>
            {t("investors.heroHeading")}
          </h1>
          <p className="font-sans text-muted" style={{ fontSize: "clamp(1rem,2vw,1.125rem)", lineHeight: 1.7, maxWidth: 640 }}>
            {t("investors.heroBody")}
          </p>
        </div>
      </section>

      {/* Why This Works Differently */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 760 }}>
          <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.differentHeading")}</h2>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>{t("investors.differentBody")}</p>
        </div>
      </section>

      {/* Meet Nova */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 760 }}>
          <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.novaHeading")}</h2>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>{t("investors.novaBody")}</p>
        </div>
      </section>

      {/* Nova Whisper */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 760 }}>
          <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.whisperHeading")}</h2>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>{t("investors.whisperBody")}</p>
        </div>
      </section>

      {/* Nova Local */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 760 }}>
          <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.localHeading")}</h2>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>{t("investors.localBody")}</p>
        </div>
      </section>

      {/* Privacy Commerce */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 760 }}>
          <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.privacyCommerceHeading")}</h2>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>{t("investors.privacyCommerceBody")}</p>
          <p className="font-sans text-muted mt-4" style={{ fontSize: "0.8125rem", opacity: 0.75 }}>{t("investors.privacyCommerceNote")}</p>
        </div>
      </section>

      {/* Proof of Attention */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 760 }}>
          <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.attentionHeading")}</h2>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>{t("investors.attentionBody")}</p>
        </div>
      </section>

      {/* One Currency, One Economy */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 760 }}>
          <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.currencyHeading")}</h2>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>{t("investors.currencyBody")}</p>
        </div>
      </section>

      {/* Proof of Vote */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 760 }}>
          <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.voteHeading")}</h2>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>{t("investors.voteBody")}</p>
        </div>
      </section>

      {/* Patent Pending Technology */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 760 }}>
          <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.patentHeading")}</h2>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>{t("investors.patentBody")}</p>
        </div>
      </section>

      {/* Governance Built to Last */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 760 }}>
          <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.governanceHeading")}</h2>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>{t("investors.governanceBody")}</p>
        </div>
      </section>

      {/* A Fee Structure Built to Last */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 760 }}>
          <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("investors.feeHeading")}</h2>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>{t("investors.feeBody")}</p>
        </div>
      </section>

      {/* Roadmap — untouched */}
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

      {/* Contact form — untouched */}
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
