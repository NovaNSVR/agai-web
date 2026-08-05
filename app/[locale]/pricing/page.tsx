import { getServerT, LOCALES } from "@/utils/serverT";
import { buildPageMetadata } from "@/utils/seo";
export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return buildPageMetadata(locale, "pricing");
}


export default async function PricingPage({ params }: { params: { locale: string } }) {
  return (
    <section
      className="container-pad"
      style={{
        paddingTop: "clamp(6rem,14vw,10rem)",
        paddingBottom: "clamp(6rem,14vw,10rem)",
      }}
    >
      <div className="max-w-content mx-auto" style={{ maxWidth: 560 }}>
        <p
          className="font-sans text-terracotta uppercase mb-6"
          style={{ fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}
        >
          Pricing
        </p>
        <h1
          className="font-serif text-ink"
          style={{
            fontSize: "clamp(2rem,5vw,3rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.018em",
            marginBottom: "1.25rem",
          }}
        >
          Pricing is being finalized.
        </h1>
        <p
          className="font-sans text-muted"
          style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}
        >
          Check back soon.
        </p>
      </div>
    </section>
  );
}
