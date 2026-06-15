import Link from "next/link";
import { getServerT, LOCALES } from "@/utils/serverT";

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export default async function ChildSafetyPage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const sections = [
    {
      title: "1. Our Commitment",
      content:
        "AlphaGlow AI and NeuroScope Technologies LLC have a zero-tolerance policy for child sexual abuse and exploitation (CSAE) on the platform. The safety, dignity, and protection of children is non-negotiable. We are fully committed to maintaining a platform environment that is safe for all users and free from any content or behavior that harms, exploits, or endangers children.",
    },
    {
      title: "2. Prohibited Content and Behavior",
      content: null,
      intro1:
        "The following content and behaviors are strictly prohibited on AlphaGlow AI and will result in immediate permanent account termination and reporting to law enforcement:",
      list1: [
        "Child Sexual Abuse Material (CSAM) — any visual, written, or audio content that sexually depicts or exploits a minor",
        "Grooming — any attempt to build trust with a minor for the purpose of sexual exploitation or abuse",
        "Child trafficking — recruitment, transport, transfer, or receipt of minors for purposes of exploitation",
        "Sextortion — coercing, threatening, or manipulating a minor into producing or sharing sexual content",
        "Sexual solicitation of minors — any communication that solicits sexual activity or content from a person under 18",
        "Any other content or behavior that sexually abuses, exploits, or endangers a child",
      ],
    },
    {
      title: "3. Enforcement",
      content:
        "Any account found engaging in prohibited conduct will be permanently banned immediately upon discovery. AlphaGlow AI will report all confirmed violations involving child sexual abuse or exploitation to the National Center for Missing and Exploited Children (NCMEC) via the CyberTipline, and to applicable law enforcement authorities. We cooperate fully with law enforcement investigations. We do not issue warnings for CSAE violations — the response is always permanent removal and mandatory reporting.",
    },
    {
      title: "4. How to Report a Concern",
      content: null,
      intro1: "If you encounter content or behavior on AlphaGlow AI that you believe endangers a child, please report it immediately:",
      list1: [
        "In-app: Use the Report function on any post, message, or user profile",
        "Email: support@alphaglowai.app — include as much detail as possible, including usernames, screenshots, and dates",
        "NCMEC CyberTipline: www.missingkids.org/gethelpnow/cybertipline (for direct reporting to NCMEC)",
      ],
      footer:
        "All reports are treated confidentially. We review every child safety report with urgency and take immediate action where warranted.",
    },
    {
      title: "5. Designated Child Safety Contact",
      content:
        "The designated child safety point of contact for AlphaGlow AI and NeuroScope Technologies LLC is reachable at admin@alphaglowai.com. This contact is responsible for receiving, reviewing, and acting on child safety reports, coordinating with law enforcement, and overseeing compliance with this policy.",
    },
    {
      title: "6. Legal Compliance",
      content:
        "AlphaGlow AI complies with all applicable child safety laws and regulations, including but not limited to the Children's Online Privacy Protection Act (COPPA), 18 U.S.C. § 2258A (mandatory reporting of apparent violations involving child sexual exploitation), and the PROTECT Our Children Act. We do not knowingly permit users under the age of 13 to create accounts on the platform.",
    },
    {
      title: "7. Scope and Effective Date",
      content:
        "This Child Safety Standards policy is effective June 6, 2026. It applies to NeuroScope Technologies LLC, AlphaGlow AI, and all users of the AlphaGlow AI platform on Google Play, the App Store, and at alphaglowai.app. This policy is reviewed regularly and updated as needed to reflect changes in law, platform features, or best practices.",
    },
    {
      title: "8. Contact",
      content: null,
      contactBlock: true,
    },
  ] as const;

  return (
    <div style={{ background: "var(--bg, #0a0a14)", minHeight: "100vh", color: "var(--ink, #f0ede8)" }}>
      {/* Nav spacer */}
      <div style={{ height: "72px" }} />

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px 96px" }}>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted, rgba(240,237,232,0.45))", marginBottom: "12px" }}>
            Legal
          </p>
          <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Child Safety Standards
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--muted, rgba(240,237,232,0.45))", margin: 0 }}>
            Effective date: June 6, 2026 &nbsp;·&nbsp; NeuroScope Technologies LLC
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {sections.map((section) => (
            <section key={section.title}>
              <h2 style={{
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--ink, #f0ede8)",
                marginBottom: "12px",
                paddingBottom: "10px",
                borderBottom: "1px solid rgba(240,237,232,0.08)",
              }}>
                {section.title}
              </h2>

              {"content" in section && section.content && (
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(240,237,232,0.75)", margin: 0 }}>
                  {section.content}
                </p>
              )}

              {"intro1" in section && section.intro1 && (
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(240,237,232,0.75)", marginBottom: "10px" }}>
                  {section.intro1}
                </p>
              )}

              {"list1" in section && section.list1 && (
                <ul style={{ margin: "0 0 12px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {section.list1.map((item) => (
                    <li key={item} style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(240,237,232,0.75)" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {"footer" in section && section.footer && (
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(240,237,232,0.75)", marginTop: "12px" }}>
                  {section.footer}
                </p>
              )}

              {"contactBlock" in section && section.contactBlock && (
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}>
                  <p style={{ margin: 0, fontSize: "0.9375rem", color: "rgba(240,237,232,0.75)", lineHeight: 1.6 }}>
                    <strong style={{ color: "var(--ink, #f0ede8)", fontWeight: 500 }}>Child Safety Contact:</strong>{" "}
                    <a href="mailto:admin@alphaglowai.com" style={{ color: "#BF5FFF", textDecoration: "none" }}>
                      admin@alphaglowai.com
                    </a>
                  </p>
                  <p style={{ margin: 0, fontSize: "0.9375rem", color: "rgba(240,237,232,0.75)", lineHeight: 1.6 }}>
                    <strong style={{ color: "var(--ink, #f0ede8)", fontWeight: 500 }}>General Support:</strong>{" "}
                    <a href="mailto:support@alphaglowai.app" style={{ color: "#BF5FFF", textDecoration: "none" }}>
                      support@alphaglowai.app
                    </a>
                  </p>
                  <p style={{ margin: 0, fontSize: "0.9375rem", color: "rgba(240,237,232,0.75)", lineHeight: 1.6 }}>
                    <strong style={{ color: "var(--ink, #f0ede8)", fontWeight: 500 }}>Mail:</strong>{" "}
                    NeuroScope Technologies LLC, 4055 Westminster Dr, Sarasota, Florida 34241
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer nav */}
        <div style={{ marginTop: "64px", paddingTop: "24px", borderTop: "1px solid rgba(240,237,232,0.08)", display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <Link href={`/${locale}/legal/privacy`} style={{ fontSize: "0.8125rem", color: "rgba(240,237,232,0.45)", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <Link href={`/${locale}/legal/terms`} style={{ fontSize: "0.8125rem", color: "rgba(240,237,232,0.45)", textDecoration: "none" }}>
            Terms of Service
          </Link>
          <Link href={`/${locale}/legal/ai-disclaimer`} style={{ fontSize: "0.8125rem", color: "rgba(240,237,232,0.45)", textDecoration: "none" }}>
            AI Disclaimer
          </Link>
        </div>
      </div>
    </div>
  );
}
