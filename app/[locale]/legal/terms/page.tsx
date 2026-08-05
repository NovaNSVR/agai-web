import LegalLayout from "@/components/LegalLayout";
import { getServerT, LOCALES } from "@/utils/serverT";
import { buildPageMetadata } from "@/utils/seo";

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return buildPageMetadata(locale, "legal/terms");
}


export default async function TermsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getServerT(locale);
  return (
    <LegalLayout title={t("terms.title")} lastUpdated={t("terms.date")} currentSuffix="/legal/terms" locale={locale} tFn={t}>

      <h2>{t("terms.s1h")}</h2><p>{t("terms.s1p")}</p>
      <h2>{t("terms.s2h")}</h2><p>{t("terms.s2p")}</p>
      <h2>{t("terms.s3h")}</h2><p>{t("terms.s3p")}</p>
      <h2>{t("terms.s4h")}</h2><p>{t("terms.s4p")}</p>
      <h2>{t("terms.s5h")}</h2>
      <p>{t("terms.s5intro")}</p>
      <ul>{([1,2,3,4,5,6] as const).map(n => <li key={n}>{t(`terms.s5i${n}`)}</li>)}</ul>
      <h2>{t("terms.s6h")}</h2><p>{t("terms.s6p")}</p>
      <h2>{t("terms.s7h")}</h2><p>{t("terms.s7p")}</p>
      <h2>{t("terms.s8h")}</h2><p>{t("terms.s8p")}</p>
      <h2>{t("terms.s9h")}</h2><p>{t("terms.s9p")}</p>
      <h2>{t("terms.s10h")}</h2><p>{t("terms.s10p")}</p>
      <h2>{t("terms.s11h")}</h2><p>{t("terms.s11p")}</p>
      <h2>{t("terms.s12h")}</h2><p>{t("terms.s12p")}</p>
      <h2>{t("terms.s13h")}</h2><p>{t("terms.s13p")}</p>
      <h2>{t("terms.s14h")}</h2><p>{t("terms.s14p")}</p>
        </LegalLayout>
  );
}
