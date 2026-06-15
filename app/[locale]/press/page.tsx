import { getServerT, LOCALES } from "@/utils/serverT";

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export default async function PressPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getServerT(locale);

  return (
    <>
      {/* Hero */}
      <section className="container-pad" style={{ paddingTop: "clamp(5rem,10vw,8rem)", paddingBottom: "clamp(4rem,8vw,7rem)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <p className="font-sans text-terracotta uppercase mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}>{t("pressPage.badge")}</p>
          <h1 className="font-serif text-ink" style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", lineHeight: 1.12, letterSpacing: "-0.018em", maxWidth: 640, marginBottom: "1.25rem" }}>
            {t("pressPage.heroHeading")}
          </h1>
          <p className="font-sans text-muted" style={{ fontSize: "clamp(1rem,2vw,1.125rem)", lineHeight: 1.7, maxWidth: 480 }}>
            {t("pressPage.heroBody")}
          </p>
        </div>
      </section>

      {/* Brand assets */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-10" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("pressPage.assetsHeading")}</h2>
          <p className="font-sans text-muted mb-10" style={{ fontSize: "0.9375rem", lineHeight: 1.7, maxWidth: 520 }}>{t("pressPage.assetsBody")}</p>
          <div className="grid gap-4 md:grid-cols-2" style={{ maxWidth: 680 }}>
            {(["logo", "guidelines"] as const).map((id) => (
              <div key={id} className="border border-divider rounded bg-surface" style={{ padding: "1.75rem" }}>
                <h3 className="font-serif text-ink mb-2" style={{ fontSize: "1rem", fontWeight: 400 }}>{t(`pressPage.${id}Name`)}</h3>
                <p className="font-sans text-muted mb-4" style={{ fontSize: "0.8125rem", lineHeight: 1.65 }}>{t(`pressPage.${id}Desc`)}</p>
                <span className="font-sans text-muted uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>{t(`pressPage.${id}Cta`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boilerplate */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-ink mb-6" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("pressPage.boilerplateHeading")}</h2>
          <div className="border border-divider rounded bg-bg" style={{ padding: "2rem 2rem", maxWidth: 720 }}>
            <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>
              {t("pressPage.boilerplateBody")}
            </p>
          </div>
        </div>
      </section>

      {/* Media contact */}
      <section className="container-pad section-pad" style={{ borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-ink mb-4" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{t("pressPage.contactHeading")}</h2>
              <p className="font-sans text-muted mb-5" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>{t("pressPage.contactBody")}</p>
              <a
                href={`mailto:${t("pressPage.contactEmail")}`}
                className="font-sans text-terracotta no-underline hover:underline"
                style={{ fontSize: "1rem", textUnderlineOffset: "3px" }}
              >
                {t("pressPage.contactEmail")}
              </a>
            </div>
            <div className="border border-divider rounded bg-surface" style={{ padding: "2rem" }}>
              <h3 className="font-serif text-ink mb-3" style={{ fontSize: "1.125rem", fontWeight: 400 }}>{t("pressPage.kitHeading")}</h3>
              <p className="font-sans text-muted mb-5" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>{t("pressPage.kitBody")}</p>
              <span className="font-sans text-muted uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>{t("pressPage.kitCta")}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
