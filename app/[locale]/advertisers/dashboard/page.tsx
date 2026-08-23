import { SUPPORTED_LOCALES } from "@/utils/locales";
import { buildPageMetadata } from "@/utils/seo";
import AdvertiserDashboardClient from "@/components/advertiser-dashboard/AdvertiserDashboardClient";

export const generateStaticParams = () => SUPPORTED_LOCALES.map((locale) => ({ locale }));

// English-only content for now (see AdvertiserDashboardClient's header
// comment) — noindex + no hreflang alternates, same pattern already used in
// utils/seo.ts for untranslated blog-post locale variants, so this doesn't
// falsely claim cross-locale equivalence it doesn't have.
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return buildPageMetadata(locale, "advertisers/dashboard", {
    title: "Advertiser Dashboard — AlphaGlow AI",
    noindex: true,
    hreflangLocales: [],
  });
}

export default function AdvertiserDashboardPage() {
  return <AdvertiserDashboardClient />;
}
