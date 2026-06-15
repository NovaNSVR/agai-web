import Link from "next/link";
import { getServerT, LOCALES } from "@/utils/serverT";

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const sections = [
    {
      title: "1. Introduction",
      content: "AlphaGlow AI (\"we,\" \"our,\" or \"us\") is a creator economy platform operated by NeuroScope Technologies LLC, located at 4055 Westminster Dr, Sarasota, Florida 34241. We are committed to protecting your privacy. This Privacy Policy explains what personal information we collect, how we use it, who we share it with, and your rights regarding that information.",
    },
    {
      title: "2. Information We Collect",
      content: null,
      intro1: "We collect information you provide directly:",
      list1: [
        "Account registration data: name and email address",
        "Profile information: language preference, personal goals, and Nova AI companion settings",
        "Session activity: completion records, streaks, and check-in responses",
        "Nova AI conversation history, used to personalize your experience",
        "Solana wallet address associated with your NSVX token account, provisioned via Crossmint",
      ],
      intro2: "We collect information automatically when you use the Platform:",
      list2: [
        "Device type, operating system version, and browser or app information",
        "Session timestamps, feature usage patterns, and interaction logs",
        "NSVX token transaction records on the Solana blockchain",
        "Push notification registration tokens (only when you opt in)",
      ],
    },
    {
      title: "3. How We Use Your Information",
      content: null,
      list1: [
        "To operate, maintain, and improve the AlphaGlow AI Platform",
        "To power Nova AI personalization, including memory continuity and coaching responses",
        "To calculate and distribute NSVX token rewards for session completions and community activity",
        "To provide creator analytics, including session performance and audience engagement data",
        "To send session reminders and notifications (only with your explicit consent)",
        "To process payments, creator revenue distributions, and NSVX token purchases",
        "To comply with applicable legal obligations and enforce our Terms of Service",
      ],
    },
    {
      title: "4. Nova AI Conversation Data",
      content: "Your conversations with Nova are stored to provide memory continuity, personalized coaching, and behavioral insights. We do not sell this data to third parties. Conversation data may be used in aggregate, anonymized form to improve AI model quality. You may request deletion of your Nova conversation history at any time.",
    },
    {
      title: "5. Third-Party Services",
      content: null,
      intro1: "We work with the following third-party service providers, each of whom processes data as necessary to deliver their services:",
      list1: [
        "Supabase — provides our authentication system and primary database infrastructure. Data is stored under Standard Contractual Clauses.",
        "Crossmint — provisions and manages your Solana smart wallet for NSVX token storage. Crossmint processes your email and wallet address.",
        "ElevenLabs — provides AI voice synthesis for Creator Digital Twin sessions. Audio generation requests are processed per ElevenLabs privacy terms.",
        "Moonpay — enables fiat-to-NSVX token purchases. Moonpay is an independent regulated payment processor subject to its own KYC/AML obligations.",
        "Solana Blockchain — NSVX token transactions are recorded on the Solana public blockchain. Blockchain data is publicly visible and cannot be deleted.",
        "Anthropic — processes Nova AI conversation data to generate responses, per Anthropic API terms.",
      ],
      footer: "We do not sell your personal data to advertisers or data brokers.",
    },
    {
      title: "6. Data Retention",
      content: "We retain account and profile data for the duration of your active account plus 90 days following deletion. Nova AI conversation history is retained for 24 months and can be deleted on written request. NSVX transaction records and financial logs are retained for 7 years for regulatory compliance. Blockchain transaction records on Solana are permanent and cannot be removed.",
    },
    {
      title: "7. Your Rights",
      content: null,
      intro1: "Depending on your jurisdiction, you may have the right to:",
      list1: [
        "Access a copy of the personal data we hold about you",
        "Correct inaccurate or incomplete personal data",
        "Request deletion of your account and associated personal data",
        "Opt out of non-essential communications and marketing",
        "Lodge a complaint with a supervisory authority (EU/EEA and UK users)",
      ],
      footer: "To exercise any of these rights, email us at admin@alphaglowai.com with the subject line \"Privacy Request.\" We will respond within 30 days.",
    },
    {
      title: "8. Cookies and Analytics",
      content: "We use essential cookies and browser storage (localStorage, IndexedDB) for authentication, session management, and offline functionality. We do not use advertising cookies or third-party behavioral tracking. We do not use Google Analytics or similar surveillance-based analytics tools.",
    },
    {
      title: "9. Children Under 13",
      content: "AlphaGlow AI is not directed to children under the age of 13. We do not knowingly collect personal information from anyone under 13. If you believe a child under 13 has created an account, contact us immediately at admin@alphaglowai.com and we will delete the account and associated data.",
    },
    {
      title: "10. Push Notifications",
      content: "Push notifications are entirely opt-in. Your device push token is stored solely for the purpose of delivering session reminders you have requested. You can revoke push notification permission at any time through your device settings.",
    },
    {
      title: "11. Changes to This Policy",
      content: "We will notify you of material changes to this Privacy Policy via in-app notification or email at least 14 days before they take effect. Continued use of the Platform after that date constitutes acceptance of the updated policy.",
    },
    {
      title: "12. Contact Us",
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
            Privacy Policy
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--muted, rgba(240,237,232,0.45))", margin: 0 }}>
            Effective date: June 1, 2026 &nbsp;·&nbsp; NeuroScope Technologies LLC
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

              {"intro2" in section && section.intro2 && (
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(240,237,232,0.75)", margin: "12px 0 10px" }}>
                  {section.intro2}
                </p>
              )}

              {"list2" in section && section.list2 && (
                <ul style={{ margin: "0 0 12px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {section.list2.map((item) => (
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
                }}>
                  <p style={{ margin: "0 0 6px", fontSize: "0.9375rem", color: "rgba(240,237,232,0.75)", lineHeight: 1.6 }}>
                    <strong style={{ color: "var(--ink, #f0ede8)", fontWeight: 500 }}>Email:</strong>{" "}
                    <a href="mailto:admin@alphaglowai.com" style={{ color: "#BF5FFF", textDecoration: "none" }}>
                      admin@alphaglowai.com
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
          <Link href={`/${locale}/legal/terms`} style={{ fontSize: "0.8125rem", color: "rgba(240,237,232,0.45)", textDecoration: "none" }}>
            Terms of Service
          </Link>
          <Link href={`/${locale}/legal/ai-disclaimer`} style={{ fontSize: "0.8125rem", color: "rgba(240,237,232,0.45)", textDecoration: "none" }}>
            AI Disclaimer
          </Link>
          <Link href={`/${locale}/legal/nsvx-disclaimer`} style={{ fontSize: "0.8125rem", color: "rgba(240,237,232,0.45)", textDecoration: "none" }}>
            NSVX Disclaimer
          </Link>
        </div>
      </div>
    </div>
  );
}
