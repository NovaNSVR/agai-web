import LegalLayout from "@/components/LegalLayout";
import { getServerT, LOCALES } from "@/utils/serverT";
import { buildPageMetadata } from "@/utils/seo";

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return buildPageMetadata(locale, "legal/ai-disclaimer");
}


export default async function AiDisclaimerPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getServerT(locale);
  return (
    <LegalLayout title={t("aiDisc.title")} lastUpdated={t("aiDisc.date")} currentSuffix="/legal/ai-disclaimer" locale={locale} tFn={t}>

      <h2>{t("aiDisc.s1h")}</h2><p>{t("aiDisc.s1p1")}</p><p>{t("aiDisc.s1p2")}</p>
      <h2>{t("aiDisc.s2h")}</h2><p>{t("aiDisc.s2p1")}</p><p>{t("aiDisc.s2p2")}</p>
      <h2>{t("aiDisc.s3h")}</h2><p>{t("aiDisc.s3p")}</p>
      <h2>{t("aiDisc.s4h")}</h2><p>{t("aiDisc.s4p")}</p>
      <h2>{t("aiDisc.s5h")}</h2><p>{t("aiDisc.s5p")}</p>
      <h2>{t("aiDisc.s6h")}</h2><p>{t("aiDisc.s6p")}</p>
      <h2>{t("aiDisc.s7h")}</h2><p>{t("aiDisc.s7p")}</p>
      <h2>{t("aiDisc.s8h")}</h2><p>{t("aiDisc.s8p")}</p>
        </LegalLayout>
  );
}
