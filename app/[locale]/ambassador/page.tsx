import Link from "next/link";
import { getServerT, LOCALES } from "@/utils/serverT";

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export const metadata = {
  title: "Ambassador Program",
  description: "Introduce creators, advertisers, or investors to AlphaGlow and earn commission on their activity.",
};

export default async function AmbassadorPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getServerT(locale);
  const app = (path = "") => `https://alphaglowai.app${path}?lang=${locale}`;

  return (
    <>
      {/* Hero */}
      <section className="container-pad" style={{ paddingTop: "clamp(5rem,10vw,8rem)", paddingBottom: "clamp(4rem,8vw,7rem)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 720 }}>
          <p className="font-sans text-terracotta uppercase mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>
            {t("ambassador.badge")}
          </p>
          <h1 className="font-serif text-ink" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", lineHeight: 1.12, letterSpacing: "-0.018em", marginBottom: "1.25rem" }}>
            {t("ambassador.heroHeading")}
          </h1>
          <p className="font-sans text-muted" style={{ fontSize: "clamp(1rem,2vw,1.125rem)", lineHeight: 1.7, maxWidth: 580, marginBottom: "2rem" }}>
            {t("ambassador.heroBody")}
          </p>
          <div className="inline-block rounded" style={{ background: "var(--surface)", border: "1px solid var(--divider)", padding: "0.875rem 1.25rem" }}>
            <p className="font-sans text-muted" style={{ fontSize: "0.9rem", margin: 0 }}>
              {t("ambassador.approvalRequired")}
            </p>
          </div>
        </div>
      </section>

      {/* Commission categories */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="mb-12">
            <h2 className="font-serif text-ink" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", marginBottom: "0.75rem" }}>
              {t("ambassador.categoriesHeading")}
            </h2>
            <p className="font-sans text-muted" style={{ fontSize: "1rem", maxWidth: 560 }}>
              {t("ambassador.categoriesBody")}
            </p>
          </div>

          <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", background: "var(--divider)", border: "1px solid var(--divider)" }}>
            {/* Creator referrals */}
            <div className="bg-surface" style={{ padding: "2rem 1.75rem" }}>
              <span className="font-sans text-terracotta uppercase block mb-4" style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", fontWeight: 500 }}>
                {t("ambassador.creatorBadge")}
              </span>
              <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.25rem", fontWeight: 400 }}>
                {t("ambassador.creatorTitle")}
              </h3>
              <p className="font-sans text-muted mb-4" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                {t("ambassador.creatorBody")}
              </p>
              <div className="font-sans" style={{ fontSize: "0.8125rem", color: "var(--muted)", borderTop: "1px solid var(--divider)", paddingTop: "1rem" }}>
                <div className="flex justify-between">
                  <span>{t("ambassador.ongoing12mo")}</span>
                  <span className="font-tabular text-ink">10%</span>
                </div>
              </div>
            </div>

            {/* Advertiser referrals */}
            <div className="bg-surface" style={{ padding: "2rem 1.75rem" }}>
              <span className="font-sans text-terracotta uppercase block mb-4" style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", fontWeight: 500 }}>
                {t("ambassador.advertiserBadge")}
              </span>
              <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.25rem", fontWeight: 400 }}>
                {t("ambassador.advertiserTitle")}
              </h3>
              <p className="font-sans text-muted mb-4" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                {t("ambassador.advertiserBody")}
              </p>
              <div className="font-sans" style={{ fontSize: "0.8125rem", color: "var(--muted)", borderTop: "1px solid var(--divider)", paddingTop: "1rem" }}>
                <div className="flex justify-between">
                  <span>{t("ambassador.ongoing12mo")}</span>
                  <span className="font-tabular text-ink">10%</span>
                </div>
              </div>
            </div>

            {/* Investor introductions */}
            <div className="bg-surface" style={{ padding: "2rem 1.75rem" }}>
              <span className="font-sans text-terracotta uppercase block mb-4" style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", fontWeight: 500 }}>
                {t("ambassador.investorBadge")}
              </span>
              <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.25rem", fontWeight: 400 }}>
                {t("ambassador.investorTitle")}
              </h3>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                {t("ambassador.investorBody")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission clarity note */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto" style={{ maxWidth: 680 }}>
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.25rem,2.5vw,1.75rem)" }}>
            {t("ambassador.clarityHeading")}
          </h2>
          <p className="font-sans text-muted mb-4" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>
            {t("ambassador.clarityBody1")}
          </p>
          <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>
            {t("ambassador.clarityBody2")}
          </p>
        </div>
      </section>

      {/* How to apply */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="mb-12">
            <h2 className="font-serif text-ink" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", marginBottom: "0.75rem" }}>
              {t("ambassador.howHeading")}
            </h2>
            <p className="font-sans text-muted" style={{ fontSize: "1rem", maxWidth: 520 }}>
              {t("ambassador.howBody")}
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {(["1", "2", "3"] as const).map((n) => (
              <div key={n}>
                <span className="font-sans font-tabular block mb-4" style={{ color: "var(--terracotta)", fontSize: "0.75rem", letterSpacing: "0.08em", fontWeight: 500 }}>
                  0{n}
                </span>
                <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.125rem", fontWeight: 400 }}>
                  {t(`ambassador.step${n}Title`)}
                </h3>
                <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                  {t(`ambassador.step${n}Body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply form */}
      <section className="container-pad section-pad" id="apply">
        <div className="max-w-content mx-auto" style={{ maxWidth: 640 }}>
          <h2 className="font-serif text-ink mb-3" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>
            {t("ambassador.applyHeading")}
          </h2>
          <p className="font-sans text-muted mb-8" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
            {t("ambassador.applyBody")}
          </p>

          <AmbassadorApplyForm t={t} locale={locale} />
        </div>
      </section>
    </>
  );
}

/* Client-side form component inlined — minimal, no framework needed */
function AmbassadorApplyForm({ t, locale }: { t: (key: string) => string; locale: string }) {
  return (
    <form
      action="https://formspree.io/f/ambassador-alphaglow"
      method="POST"
      className="grid gap-5"
    >
      <input type="hidden" name="locale" value={locale} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="font-sans block mb-1.5" style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
            {t("ambassador.formName")} *
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full font-sans rounded border border-divider bg-surface text-ink"
            style={{ padding: "10px 12px", fontSize: "0.9375rem", outline: "none" }}
            placeholder={t("ambassador.formNamePlaceholder")}
          />
        </div>
        <div>
          <label className="font-sans block mb-1.5" style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
            {t("ambassador.formEmail")} *
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full font-sans rounded border border-divider bg-surface text-ink"
            style={{ padding: "10px 12px", fontSize: "0.9375rem", outline: "none" }}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="font-sans block mb-1.5" style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
          {t("ambassador.formType")} *
        </label>
        <select
          name="referral_type"
          required
          className="w-full font-sans rounded border border-divider bg-surface text-ink"
          style={{ padding: "10px 12px", fontSize: "0.9375rem", outline: "none" }}
        >
          <option value="">{t("ambassador.formTypeDefault")}</option>
          <option value="creator">{t("ambassador.formTypeCreator")}</option>
          <option value="advertiser">{t("ambassador.formTypeAdvertiser")}</option>
          <option value="investor">{t("ambassador.formTypeInvestor")}</option>
        </select>
      </div>

      <div>
        <label className="font-sans block mb-1.5" style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
          {t("ambassador.formBackground")}
        </label>
        <textarea
          name="background"
          rows={4}
          className="w-full font-sans rounded border border-divider bg-surface text-ink"
          style={{ padding: "10px 12px", fontSize: "0.9375rem", outline: "none", resize: "vertical" }}
          placeholder={t("ambassador.formBackgroundPlaceholder")}
        />
      </div>

      <div>
        <label className="font-sans block mb-1.5" style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
          {t("ambassador.formAudience")}
        </label>
        <textarea
          name="audience"
          rows={3}
          className="w-full font-sans rounded border border-divider bg-surface text-ink"
          style={{ padding: "10px 12px", fontSize: "0.9375rem", outline: "none", resize: "vertical" }}
          placeholder={t("ambassador.formAudiencePlaceholder")}
        />
      </div>

      <button
        type="submit"
        className="font-sans rounded text-surface"
        style={{ backgroundColor: "var(--terracotta)", fontSize: "0.9375rem", fontWeight: 500, padding: "14px 28px", border: "none", cursor: "pointer", width: "fit-content" }}
      >
        {t("ambassador.formSubmit")}
      </button>

      <p className="font-sans text-muted" style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}>
        {t("ambassador.formDisclaimer")}
      </p>
    </form>
  );
}
