import Link from "next/link";

export const generateStaticParams = () => [{ locale: "en" }];

// Internal design-preview page, not real site content -- excluded from
// the sitemap and kept out of search results.
export const metadata = { robots: { index: false, follow: false } };

const CATEGORIES = [
  {
    name: "Musicians",
    icon: "♪",
    headline: "Your music, teaching itself",
    body: "Release exclusive tracks, behind-the-scenes lessons, and production breakdowns. Your Digital Twin answers fan questions in your voice — at scale.",
  },
  {
    name: "Podcasters",
    icon: "🎙",
    headline: "Episodes that never stop working",
    body: "Publish episodes, run live Q&As with your AI voice, and let fans dive deeper into every topic — long after the recording ends.",
  },
  {
    name: "Coaches",
    icon: "◈",
    headline: "Scale your impact without scaling your hours",
    body: "Package your frameworks into guided sessions. Your Digital Twin coaches clients through your methodology 24 hours a day, seven days a week.",
  },
  {
    name: "Educators",
    icon: "◉",
    headline: "Courses that adapt to every learner",
    body: "Build structured courses with Nova-narrated lessons. Your Digital Twin answers student questions instantly, in your style and voice.",
  },
  {
    name: "Fitness Trainers",
    icon: "⬡",
    headline: "Train more people than you can count",
    body: "Publish workout sessions, nutrition guides, and check-in programmes. Your Digital Twin keeps clients accountable between live sessions.",
  },
  {
    name: "Storytellers",
    icon: "✦",
    headline: "Your stories, always on",
    body: "Publish serialised audio stories, narrative essays, or spoken-word pieces. Your Digital Twin guides listeners through your universe.",
  },
];

export default function PreviewCreatorsA({ params }: { params: { locale: string } }) {
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
              maxWidth: 680,
              marginBottom: "1.5rem",
            }}
          >
            Built for every kind of creator
          </h1>
          <p
            className="font-sans text-muted"
            style={{
              fontSize: "clamp(1rem,2vw,1.125rem)",
              lineHeight: 1.7,
              maxWidth: 520,
              marginBottom: "2.5rem",
            }}
          >
            AlphaGlow AI gives you a Digital Twin, a publishing platform, and a monetisation engine — whatever your craft.
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

      {/* Category grid */}
      <section
        className="container-pad"
        style={{
          paddingTop: "clamp(4rem,8vw,6rem)",
          paddingBottom: "clamp(4rem,8vw,7rem)",
        }}
      >
        <div className="max-w-content mx-auto">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                style={{
                  border: "1px solid var(--divider)",
                  borderRadius: 12,
                  padding: "2rem 1.75rem",
                  background: "var(--surface)",
                }}
              >
                <div
                  className="font-serif text-terracotta"
                  style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
                >
                  {cat.icon}
                </div>
                <p
                  className="font-sans text-ink"
                  style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}
                >
                  {cat.name}
                </p>
                <h2
                  className="font-serif text-ink"
                  style={{ fontSize: "1.25rem", lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: "0.75rem" }}
                >
                  {cat.headline}
                </h2>
                <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.65 }}>
                  {cat.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="container-pad"
        style={{
          paddingTop: "clamp(3rem,6vw,5rem)",
          paddingBottom: "clamp(4rem,8vw,7rem)",
          borderTop: "1px solid var(--divider)",
          textAlign: "center",
        }}
      >
        <div className="max-w-content mx-auto" style={{ maxWidth: 560 }}>
          <h2
            className="font-serif text-ink"
            style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)", lineHeight: 1.15, letterSpacing: "-0.015em", marginBottom: "1.25rem" }}
          >
            Your expertise deserves a platform built for it
          </h2>
          <p className="font-sans text-muted" style={{ fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Set up your creator studio, connect your Digital Twin, and start earning NSVX from day one.
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
