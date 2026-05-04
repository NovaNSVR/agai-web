"use client";

import LegalLayout from "@/components/LegalLayout";
import { useI18n } from "@/utils/i18n";

export default function NsvxDisclaimerPage() {
  const { t } = useI18n();
  return (
    <LegalLayout title={t("nsvxDisc.title")} lastUpdated={t("nsvxDisc.date")} currentSuffix="/legal/nsvx-disclaimer">
      <h2>{t("nsvxDisc.s1h")}</h2><p>{t("nsvxDisc.s1p")}</p>
      <h2>{t("nsvxDisc.s2h")}</h2>
      <p>{t("nsvxDisc.s2intro")}</p>
      <ul>{([1,2,3,4,5] as const).map(n => <li key={n}>{t(`nsvxDisc.s2i${n}`)}</li>)}</ul>
      <h2>{t("nsvxDisc.s3h")}</h2><p>{t("nsvxDisc.s3p")}</p>
      <h2>{t("nsvxDisc.s4h")}</h2><p>{t("nsvxDisc.s4p")}</p>
      <h2>{t("nsvxDisc.s5h")}</h2><p>{t("nsvxDisc.s5p")}</p>
      <h2>{t("nsvxDisc.s6h")}</h2><p>{t("nsvxDisc.s6p")}</p>
      <h2>{t("nsvxDisc.s7h")}</h2><p>{t("nsvxDisc.s7p")}</p>
      <h2>{t("nsvxDisc.s8h")}</h2><p>{t("nsvxDisc.s8p")}</p>
      <h2>{t("nsvxDisc.s9h")}</h2><p>{t("nsvxDisc.s9p")}</p>
      <h2>{t("nsvxDisc.s10h")}</h2><p>{t("nsvxDisc.s10p")}</p>
    </LegalLayout>
  );
}
