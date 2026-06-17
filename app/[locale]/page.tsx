import { getServerT, LOCALES } from "@/utils/serverT";
import HomeHeroKinetic from "@/components/HomeHeroKinetic";

const CARD_KEYS = ["Users", "Creators", "Advertisers", "Investors"] as const;
const CARD_HREFS: Record<string, string> = {
  Users: "/for-users",
  Creators: "/for-creators",
  Advertisers: "/advertisers",
  Investors: "/investors",
};

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const { t } = await getServerT(locale);
  const l = (path: string) => `/${locale}${path}`;
  const app = (path = "") => `https://alphaglowai.app${path}?lang=${locale}`;

  const cards = CARD_KEYS.map((key) => ({
    title: t(`home.v2Card${key}Title`),
    body: t(`home.v2Card${key}Body`),
    link: t(`home.v2Card${key}Link`),
    href: l(CARD_HREFS[key]),
  }));

  return (
    <HomeHeroKinetic
      locale={locale}
      heroHeading={t("home.v2HeroHeading")}
      heroSub={t("home.v2HeroSub")}
      heroCtaApp={t("home.heroCtaApp")}
      heroCtaCreators={t("home.heroCtaCreators")}
      appUrl={app()}
      creatorsUrl={l("/for-creators")}
      cards={cards}
      brandPrimary={t("home.v2BrandPrimary")}
      brandSecondary={t("home.v2BrandSecondary")}
    />
  );
}
