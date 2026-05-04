"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/utils/i18n";

export default function LegalIndexPage() {
  const { locale } = useI18n();
  const router = useRouter();
  useEffect(() => { router.replace(`/${locale}/legal/terms`); }, [locale, router]);
  return null;
}
