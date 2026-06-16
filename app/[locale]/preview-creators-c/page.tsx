import Link from "next/link";

export const generateStaticParams = () => [{ locale: "en" }];

const EXAMPLES = [
  {
    label: "Musician",
    headline: "A guitarist who teaches jazz theory",
    body: "Publishes technique sessions and ear-training programmes. Fans unlock full courses with NSVX; his Digital Twin answers theory questions live.",
  },
  {
    label: "Coach",
    headline: "An executive coach with a proprietary framework",
    body: "Packages her methodology into a 12-week journey. Clients work through modules at their own pace; her Digital Twin holds them accountable between live calls.",
  },
  {
    label: "Podcaster",
    headline: "A true-crime host building a paid archive",
    body: "Unlockable episodes, bonus deep-dives, and a Digital Twin that discusses case evidence with superfans — available long after the episode drops.",
  },
];

export default function PreviewCreatorsC({ params }: { params: { locale: string } }) {
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
            Whatever you know, there is an audience for it
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
            AlphaGlow AI is built for any creator with expertise worth sharing — musician, educator, coach, trainer, podcaster, or something that does not have a name yet.
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

      {/* Examples */}
      <section
        className="container-pad"
        style={{
          paddingTop: "clamp(4rem,8vw,6rem)",
          paddingBottom: "clamp(3rem,6vw,5rem)",
          borderBottom: "1px solid var(--divider)",
        }}
      >
        <div className="max-w-content mx-auto">
          <p
            className="font-sans text-muted uppercase"
            style={{ fontSize: "0.7rem", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "2.5rem" }}
          >
            A few examples
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {EXAMPLES.map((ex, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  gap: "2.5rem",
                  alignItems: "start",
                  paddingBottom: "2.5rem",
                  borderBottom: i < EXAMPLES.length - 1 ? "1px solid var(--divider)" : undefined,
                }}
              >
                <p
                  className="font-sans text-terracotta"
                  style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", paddingTop: "0.2rem" }}
                >
                  {ex.label}
                </p>
                <div>
                  <h2
                    className="font-serif text-ink"
                    style={{ fontSize: "1.25rem", lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: "0.6rem" }}
                  >
                    {ex.headline}
                  </h2>
                  <p className="font-sans text-muted" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                    {ex.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open invitation */}
      <section
        className="container-pad"
        style={{
          paddingTop: "clamp(3rem,6vw,5rem)",
          paddingBottom: "clamp(4rem,8vw,6rem)",
          borderBottom: "1px solid var(--divider)",
        }}
      >
        <div className="max-w-content mx-auto" style={{ maxWidth: 620 }}>
          <h2
            className="font-serif text-ink"
            style={{ fontSize: "clamp(1.5rem,3vw,2rem)", lineHeight: 1.2, letterSpacing: "-0.012em", marginBottom: "1.25rem" }}
          >
            Any creator is welcome
          </h2>
          <p className="font-sans text-muted" style={{ fontSize: "1rem", lineHeight: 1.8 }}>
            Whatever your expertise, there is a category for it — and if one does not exist yet, the platform builds one around you — no follower minimum to qualify, and no review process to pass. If you have something worth teaching, performing, or discussing — you can publish it here, set your price, and let your Digital Twin work on your behalf while you sleep.
          </p>
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
            Your studio is waiting
          </h2>
          <p className="font-sans text-muted" style={{ fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Set up in minutes. Go live the same day.
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
