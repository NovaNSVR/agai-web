import { notFound } from "next/navigation";
import { I18nProvider } from "@/utils/i18n";
import { SUPPORTED_LOCALES, type Locale } from "@/utils/locales";
import { getDictionary } from "@/utils/getDictionary";
import { flatten } from "@/utils/flattenDict";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const SUPPORTED: readonly string[] = SUPPORTED_LOCALES;

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

// No generateMetadata here on purpose. Canonical/hreflang/openGraph are
// page-specific (they must point at the actual page, not the locale root),
// so every real content page under this layout calls
// utils/seo.ts:buildPageMetadata() itself with its own path. A layout-level
// default here previously computed canonical from the locale alone, which
// meant every page silently inherited "canonical = my locale's homepage"
// unless it explicitly overrode it — nothing did, so every inner page on
// the site was telling search engines its canonical version was the
// homepage. See CLAUDE.md for the full incident writeup.

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
