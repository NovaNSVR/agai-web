"use client";

import LegalLayout from "@/components/LegalLayout";
import { useI18n } from "@/utils/i18n";

export default function AiDisclaimerPage() {
  const { t } = useI18n();
  return (
    <LegalLayout title={t("aiDisc.title")} lastUpdated={t("aiDisc.date")} currentSuffix="/legal/ai-disclaimer">
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
