import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/utils/i18n";
import { SUPPORTED_LOCALES, type Locale } from "@/utils/locales";
import { getDictionary } from "@/utils/getDictionary";
import { flatten } from "@/utils/flattenDict";
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

  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) {
    languages[l] = `${BASE_URL}/${l}/`;
  }
  languages["x-default"] = `${BASE_URL}/en/`;

  return {
    alternates: {
      canonical: `${BASE_URL}/${locale}/`,
      languages,
    },
  };
}

// Server component — loads locale messages at SSG time so the static HTML
// contains real text instead of raw translation keys.
export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!SUPPORTED.includes(locale)) notFound();

  const dict = await getDictionary(locale);
  const initialMessages = flatten(dict as Record<string, unknown>);

  return (
    <I18nProvider locale={locale as Locale} initialMessages={initialMessages}>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
