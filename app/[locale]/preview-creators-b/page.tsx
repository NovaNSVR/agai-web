import Link from "next/link";

export const generateStaticParams = () => [{ locale: "en" }];

// Internal design-preview page, not real site content -- excluded from
// the sitemap and kept out of search results.
export const metadata = { robots: { index: false, follow: false } };

export default function PreviewCreatorsB({ params }: { params: { locale: string } }) {
  const app = (path = "") => `https://alphaglowai.app${path}`;

  return (
    <main>
      {/* Hero */}
      <section
        className="container-pad"
        style={{
          paddingTop: "clamp(5rem,10vw,8rem)",
          paddingBottom: "clamp(4rem,8vw,6rem)",
          borderBottom: "1px solid var(--divider)",
        }}
      >
        <div className="max-w-content mx-auto">
          <p
            className="font-sans text-terracotta uppercase mb-4"
            style={{ fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 500 }}
          >
            For Creators
          </p>
          <h1
            className="font-serif text-ink"
            style={{
              fontSize: "clamp(2.25rem,5vw,3.5rem)",
              lineHeight: 1.12,
              letterSpacing: "-0.018em",
              maxWidth: 700,
              marginBottom: "1.5rem",
            }}
          >
            If you create, AlphaGlow AI is for you
          </h1>
          <p
            className="font-sans text-muted"
            style={{
              fontSize: "clamp(1rem,2vw,1.125rem)",
              lineHeight: 1.7,
              maxWidth: 540,
              marginBottom: "2.5rem",
            }}
          >
            Musician, coach, educator, storyteller, trainer, podcaster — whatever you make, AlphaGlow AI gives you the infrastructure to publish it, teach with it, and earn from it.
          </p>
          <Link
            href={app("/creator-onboarding")}
            className="font-sans no-underline text-surface rounded inline-block"
            style={{
              backgroundColor: "var(--terracotta)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              padding: "14px 28px",
            }}
          >
            Start for free
          </Link>
        </div>
      </section>

      {/* Open-ended prose section */}
      <section
        className="container-pad"
        style={{
          paddingTop: "clamp(4rem,8vw,6rem)",
          paddingBottom: "clamp(4rem,8vw,6rem)",
          borderBottom: "1px solid var(--divider)",
        }}
      >
        <div
          className="max-w-content mx-auto"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem,5vw,5rem)",
            alignItems: "start",
          }}
        >
          <div>
            <h2
              className="font-serif text-ink"
              style={{ fontSize: "clamp(1.5rem,3vw,2rem)", lineHeight: 1.2, letterSpacing: "-0.012em", marginBottom: "1.25rem" }}
            >
              Any expertise. Any format.
            </h2>
            <div
              className="font-sans text-muted"
              style={{ fontSize: "1rem", lineHeight: 1.8 }}
            >
              <p style={{ marginBottom: "1rem" }}>
                AlphaGlow AI does not sort creators into boxes. You publish what you know, in the format that fits — audio sessions, guided programmes, live streams, narrated courses, or serialised content.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                The platform handles the infrastructure: a personalised studio, AI-narrated session production, NSVX monetisation, and a Digital Twin that represents you to your audience around the clock.
              </p>
              <p>
                Your Digital Twin is not a chatbot. It streams live video in your likeness and cloned voice, powered by the content you publish. It answers questions, delivers sessions, and deepens every relationship your audience has with your work.
              </p>
            </div>
          </div>
          <div>
            <h2
              className="font-serif text-ink"
              style={{ fontSize: "clamp(1.5rem,3vw,2rem)", lineHeight: 1.2, letterSpacing: "-0.012em", marginBottom: "1.25rem" }}
            >
              Earn while you are not online
            </h2>
            <div
              className="font-sans text-muted"
              style={{ fontSize: "1rem", lineHeight: 1.8 }}
            >
              <p style={{ marginBottom: "1rem" }}>
                Every session unlock, journey purchase, and ad impression earns you NSVX — the platform token that converts to cash or compounds into creator rewards.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                You set your prices. You own your content. AlphaGlow AI supplies the audience, the tools, and the AI engine. The revenue share is transparent and instant.
              </p>
              <p>
                Most creators go live within a day. There is no approval process, no follower minimum, and no platform tax on organic reach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="container-pad"
        style={{
          paddingTop: "clamp(3rem,6vw,5rem)",
          paddingBottom: "clamp(4rem,8vw,7rem)",
          textAlign: "center",
        }}
      >
        <div className="max-w-content mx-auto" style={{ maxWidth: 540 }}>
          <h2
            className="font-serif text-ink"
            style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)", lineHeight: 1.15, letterSpacing: "-0.015em", marginBottom: "1.25rem" }}
          >
            You make it. We help the world find it.
          </h2>
          <p className="font-sans text-muted" style={{ fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Open to any creator with expertise worth sharing.
          </p>
          <Link
            href={app("/creator-onboarding")}
            className="font-sans no-underline text-surface rounded inline-block"
            style={{
              backgroundColor: "var(--terracotta)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              padding: "14px 28px",
            }}
          >
            Create your studio
          </Link>
        </div>
      </section>
    </main>
  );
}
