"use client";

import LegalLayout from "@/components/LegalLayout";
import { useI18n } from "@/utils/i18n";

export default function HealthDisclaimerPage() {
  const { t } = useI18n();
  return (
    <LegalLayout title={t("healthDisc.title")} lastUpdated={t("healthDisc.date")} currentSuffix="/legal/health-disclaimer">
      <h2>{t("healthDisc.s1h")}</h2><p>{t("healthDisc.s1p")}</p>
      <h2>{t("healthDisc.s2h")}</h2><p>{t("healthDisc.s2p1")}</p><p>{t("healthDisc.s2p2")}</p>
      <h2>{t("healthDisc.s3h")}</h2><p>{t("healthDisc.s3p")}</p>
      <h2>{t("healthDisc.s4h")}</h2><p>{t("healthDisc.s4p1")}</p><p>{t("healthDisc.s4p2")}</p>
      <h2>{t("healthDisc.s5h")}</h2><p>{t("healthDisc.s5p1")}</p><p>{t("healthDisc.s5p2")}</p>
      <h2>{t("healthDisc.s6h")}</h2><p>{t("healthDisc.s6p")}</p>
      <h2>{t("healthDisc.s7h")}</h2><p>{t("healthDisc.s7p")}</p>
      <h2>{t("healthDisc.s8h")}</h2><p>{t("healthDisc.s8p")}</p>
      <h2>{t("healthDisc.s9h")}</h2><p>{t("healthDisc.s9p")}</p>
    </LegalLayout>
  );
}
