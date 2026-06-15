import LegalLayout from "@/components/LegalLayout";
import { getServerT, LOCALES } from "@/utils/serverT";

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export default async function CreatorAgreementPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getServerT(locale);
  return (
    <LegalLayout title={t("creatorAgreement.title")} lastUpdated={t("creatorAgreement.date")} currentSuffix="/legal/creator-agreement" locale={locale} tFn={t}>

      <h2>{t("creatorAgreement.s1h")}</h2><p>{t("creatorAgreement.s1p")}</p>
      <h2>{t("creatorAgreement.s2h")}</h2>
      <p>{t("creatorAgreement.s2intro")}</p>
      <ul>{([1,2,3,4,5,6] as const).map(n => <li key={n}>{t(`creatorAgreement.s2i${n}`)}</li>)}</ul>
      <h2>{t("creatorAgreement.s3h")}</h2><p>{t("creatorAgreement.s3p")}</p>
      <h2>{t("creatorAgreement.s4h")}</h2><p>{t("creatorAgreement.s4p1")}</p><p>{t("creatorAgreement.s4p2")}</p>
      <h2>{t("creatorAgreement.s5h")}</h2><p>{t("creatorAgreement.s5p")}</p>
      <h2>{t("creatorAgreement.s6h")}</h2>
      <p>{t("creatorAgreement.s6intro")}</p>
      <ul>{([1,2,3,4,5,6,7] as const).map(n => <li key={n}>{t(`creatorAgreement.s6i${n}`)}</li>)}</ul>
      <h2>{t("creatorAgreement.s7h")}</h2><p>{t("creatorAgreement.s7p")}</p>
      <h2>{t("creatorAgreement.s8h")}</h2><p>{t("creatorAgreement.s8p")}</p>
      <h2>{t("creatorAgreement.s9h")}</h2>
      <p>{t("creatorAgreement.s9intro")}</p>
      <ul>{([1,2,3,4] as const).map(n => <li key={n}>{t(`creatorAgreement.s9i${n}`)}</li>)}</ul>
      <h2>{t("creatorAgreement.s10h")}</h2><p>{t("creatorAgreement.s10p")}</p>
      <h2>{t("creatorAgreement.s11h")}</h2><p>{t("creatorAgreement.s11p")}</p>
        </LegalLayout>
  );
}
