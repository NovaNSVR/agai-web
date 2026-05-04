import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/utils/i18n";
import { SUPPORTED_LOCALES, type Locale } from "@/utils/locales";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const SUPPORTED: readonly string[] = SUPPORTED_LOCALES;
const BASE_URL = "https://alphaglowai.com";

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  if (!SUPPORTED.includes(locale)) return {};

  // Build hreflang alternates using the request pathname (injected by middleware)
  const headersList = headers();
  const pathname = headersList.get("x-pathname") ?? `/${locale}`;
  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || "/";

  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) {
    languages[l] = `${BASE_URL}/${l}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
  }
  // x-default points to English
  languages["x-default"] = `${BASE_URL}/en${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

  return {
    alternates: {
      canonical: `${BASE_URL}/${locale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`,
      languages,
    },
  };
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  if (!SUPPORTED.includes(locale)) notFound();

  return (
    <I18nProvider locale={locale as Locale}>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
