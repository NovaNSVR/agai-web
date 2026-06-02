"use client";

import LegalLayout from "@/components/LegalLayout";
import { useI18n } from "@/utils/i18n";

export default function PrivacyPage() {
  const { t } = useI18n();
  return (
    <LegalLayout title={t("privacy.title")} lastUpdated={t("privacy.date")} currentSuffix="/legal/privacy">
      <h2>{t("privacy.s1h")}</h2><p>{t("privacy.s1p")}</p>
      <h2>{t("privacy.s2h")}</h2>
      <p>{t("privacy.s2intro1")}</p>
      <ul>{([1,2,3,4,5] as const).map(n => <li key={n}>{t(`privacy.s2i${n}`)}</li>)}</ul>
      <p>{t("privacy.s2intro2")}</p>
      <ul>{([6,7,8,9] as const).map(n => <li key={n}>{t(`privacy.s2i${n}`)}</li>)}</ul>
      <h2>{t("privacy.s3h")}</h2>
      <ul>{([1,2,3,4,5,6,7] as const).map(n => <li key={n}>{t(`privacy.s3i${n}`)}</li>)}</ul>

      <h2>{t("privacy.s4h")}</h2><p>{t("privacy.s4p")}</p>

      <h2>{t("privacy.s5h")}</h2>
      <p>{t("privacy.s5intro")}</p>
      <ul>{([1,2,3,4,5,6] as const).map(n => <li key={n}>{t(`privacy.s5i${n}`)}</li>)}</ul>
      <p>{t("privacy.s5p")}</p>

      <h2>{t("privacy.s6h")}</h2><p>{t("privacy.s6p")}</p>

      <h2>{t("privacy.s7h")}</h2>
      <p>{t("privacy.s7intro")}</p>
      <ul>{([1,2,3,4,5] as const).map(n => <li key={n}>{t(`privacy.s7i${n}`)}</li>)}</ul>
      <p>{t("privacy.s7p")}</p>

      <h2>{t("privacy.s8h")}</h2><p>{t("privacy.s8p")}</p>

      <h2>{t("privacy.s9h")}</h2><p>{t("privacy.s9p")}</p>

      <h2>{t("privacy.s10h")}</h2><p>{t("privacy.s10p")}</p>

      <h2>{t("privacy.s11h")}</h2><p>{t("privacy.s11p")}</p>

      <h2>{t("privacy.s12h")}</h2><p>{t("privacy.s12p")}</p>
    </LegalLayout>
  );
}
