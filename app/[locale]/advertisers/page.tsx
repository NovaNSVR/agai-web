import Link from "next/link";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import type { FormField } from "@/components/ContactForm";
import { getServerT, LOCALES } from "@/utils/serverT";

const AD_CLASSES = ["preSess", "whisper", "pulse"] as const;
const PRICING_TIERS = ["selfServe", "managed", "enterprise"] as const;

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export default async function AdvertisersPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getServerT(locale);

  const faqItems = [1, 2, 3].map((n) => ({
    q: t(`advertisers.faq${n}Q`),
    a: t(`advertisers.faq${n}A`),
  }));

  const contactFields: FormField[] = [
    { name: "name", label: t("advertisers.formName"), type: "text", required: true },
    { name: "email", label: t("advertisers.formEmail"), type: "email", required: true },
    { name: "company", label: t("advertisers.formCompany"), type: "text", required: true },
    {
      name: "budget",
      label: t("advertisers.formBudget"),
      type: "select",
      options: [
        t("advertisers.budgetOpt1"),
        t("advertisers.budgetOpt2"),
        t("advertisers.budgetOpt3"),
        t("advertisers.budgetOpt4"),
      ],
    },
    { name: "message", label: t("advertisers.formMessage"), type: "textarea", required: true },
  ];

  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: "clamp(5rem,10vw,8rem)",
          paddingBottom: "clamp(4rem,8vw,7rem)",
          borderBottom: "1px solid var(--divider)",
        }}
        className="container-pad"
      >
        <div className="max-w-content mx-auto">
          <p className="font-sans uppercase mb-4" style={{ color: "var(--nova-teal)", fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>
            {t("advertisers.badge")}
          </p>
          <h1 className="font-serif text-ink" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", lineHeight: 1.12, letterSpacing: "-0.018em", maxWidth: 740, marginBottom: "1.5rem" }}>
            {t("advertisers.heroHeading")}
          </h1>
          <p className="font-sans text-muted" style={{ fontSize: "clamp(1rem,2vw,1.125rem)", lineHeight: 1.7, maxWidth: 560, marginBottom: "2.5rem" }}>
            {t("advertisers.heroBody")}
          </p>
          <a
            href="#contact"
            className="font-sans no-underline rounded inline-block"
            style={{ backgroundColor: "var(--nova-teal)", color: "#060F0F", fontSize: "0.9375rem", fontWeight: 600, padding: "14px 28px" }}
          >
            {t("advertisers.heroCta")}
          </a>
        </div>
      </section>

      {/* Nova Whisper explained */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("advertisers.whisperHeading")}</h2>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("advertisers.whisperBody")}</p>
            </div>
            <div className="border border-divider rounded bg-surface" style={{ padding: "2rem" }}>
              <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.75 }}>
                {t("advertisers.whisperStat")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three ad classes */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-12" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("advertisers.adClassesHeading")}</h2>
          <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", background: "var(--divider)", border: "1px solid var(--divider)" }}>
            {AD_CLASSES.map((id, i) => (
              <div key={id} className="bg-surface" style={{ padding: "2rem 1.75rem" }}>
                <span className="font-sans font-tabular block mb-3" style={{ color: "var(--nova-teal)", fontSize: "0.75rem", letterSpacing: "0.12em", fontWeight: 500 }}>
                  0{i + 1}
                </span>
                <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.125rem", fontWeight: 400 }}>{t(`advertisers.${id}Name`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>{t(`advertisers.${id}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nova Local + Proof of Attention */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="font-sans uppercase mb-3" style={{ color: "var(--terracotta)", fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>{t("advertisers.localBadge")}</p>
              <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.25rem,2.5vw,1.75rem)" }}>{t("advertisers.localHeading")}</h2>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("advertisers.localBody")}</p>
            </div>
            <div>
              <p className="font-sans uppercase mb-3" style={{ color: "var(--terracotta)", fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>{t("advertisers.attentionBadge")}</p>
              <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.25rem,2.5vw,1.75rem)" }}>{t("advertisers.attentionHeading")}</h2>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("advertisers.attentionBody")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("advertisers.pricingHeading")}</h2>
          <p className="font-sans text-muted mb-6" style={{ fontSize: "0.9375rem", lineHeight: 1.7, maxWidth: 560 }}>{t("advertisers.pricingBody")}</p>
          <p className="font-sans text-muted mb-12" style={{ fontSize: "0.8125rem", lineHeight: 1.65, maxWidth: 560, opacity: 0.75 }}>{t("advertisers.statsDisclaimer")}</p>
          <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", background: "var(--divider)", border: "1px solid var(--divider)" }}>
            {PRICING_TIERS.map((id) => (
              <div key={id} className="bg-surface" style={{ padding: "2rem 1.75rem" }}>
                <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.125rem", fontWeight: 400 }}>{t(`advertisers.${id}Name`)}</h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>{t(`advertisers.${id}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-10" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("advertisers.faqHeading")}</h2>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* Contact form */}
      <section id="contact" className="container-pad section-pad">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("advertisers.contactHeading")}</h2>
              <p className="font-sans text-muted mb-6" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("advertisers.contactBody")}</p>
            </div>
            <ContactForm
              formName="advertiser-enquiry"
              fields={contactFields}
              submitLabel={t("advertisers.formSubmit")}
              successMessage={t("advertisers.formSuccess")}
            />
          </div>
        </div>
      </section>
    </>
  );
}
