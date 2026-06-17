"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

interface Card {
  title: string;
  body: string;
  link: string;
  href: string;
}

interface Props {
  locale: string;
  heroHeading: string;
  heroSub: string;
  heroCtaApp: string;
  heroCtaCreators: string;
  appUrl: string;
  creatorsUrl: string;
  cards: Card[];
  brandPrimary: string;
  brandSecondary: string;
}

export default function HomeHeroKinetic({
  heroHeading,
  heroSub,
  heroCtaApp,
  heroCtaCreators,
  appUrl,
  creatorsUrl,
  cards,
  brandPrimary,
  brandSecondary,
}: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      const headline = headlineRef.current;
      const underline = underlineRef.current;
      if (!hero || !headline) return;

      const scrolled = Math.max(0, -hero.getBoundingClientRect().top);
      const heroH = hero.offsetHeight;
      const progress = Math.min(1, scrolled / (heroH * 0.65));

      headline.style.fontWeight = String(Math.round(700 - progress * 400));
      headline.style.letterSpacing = (-0.02 + progress * 0.07).toFixed(3) + "em";

      if (underline) {
        underline.style.transform = `scaleX(${Math.min(1, progress * 2)})`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Dark hero ── */}
      <section
        ref={heroRef}
        className="hero-v2 container-pad"
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "clamp(5rem, 12vw, 9rem)",
          paddingBottom: "clamp(4rem, 10vw, 7rem)",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto", width: "100%" }}>
          <p
            className="font-sans"
            style={{
              color: "var(--gold)",
              fontSize: "0.6875rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            AlphaGlow AI
          </p>

          <h1
            ref={headlineRef}
            className="font-display"
            style={{
              fontSize: "clamp(3.25rem, 8.5vw, 8rem)",
              lineHeight: 1.05,
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              color: "var(--dark-ink)",
              whiteSpace: "pre-line",
              marginBottom: "1.5rem",
              maxWidth: "18ch",
            }}
          >
            {heroHeading}
          </h1>

          <span
            ref={underlineRef}
            className="hero-v2-underline"
            style={{ marginBottom: "clamp(2rem, 5vw, 3.5rem)", width: "min(560px, 90%)" }}
            aria-hidden="true"
          />

          <p
            className="font-sans"
            style={{
              color: "var(--dark-muted)",
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              lineHeight: 1.75,
              maxWidth: "48ch",
              marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            {heroSub}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
            <a
              href={appUrl}
              className="font-sans"
              style={{
                backgroundColor: "var(--gold)",
                color: "#0A0A0A",
                fontSize: "0.9375rem",
                fontWeight: 600,
                padding: "14px 28px",
                borderRadius: "2px",
                textDecoration: "none",
                letterSpacing: "0.01em",
              }}
            >
              {heroCtaApp}
            </a>
            <a
              href={creatorsUrl}
              className="font-sans"
              style={{
                color: "var(--dark-ink)",
                fontSize: "0.9375rem",
                fontWeight: 400,
                padding: "14px 28px",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "2px",
                textDecoration: "none",
              }}
            >
              {heroCtaCreators}
            </a>
          </div>
        </div>
      </section>

      {/* ── Four glass cards ── */}
      <section
        className="hero-v2 container-pad"
        style={{
          paddingTop: "clamp(3rem, 6vw, 5rem)",
          paddingBottom: "clamp(4rem, 8vw, 7rem)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {cards.map((card) => (
            <div key={card.title} className="hero-v2-card" style={{ padding: "clamp(1.75rem, 3vw, 2.5rem)" }}>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(1.625rem, 2.5vw, 2.125rem)",
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "var(--dark-ink)",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.875rem",
                  lineHeight: 1.15,
                }}
              >
                {card.title}
              </h2>
              <p
                className="font-sans"
                style={{
                  color: "var(--dark-muted)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                  marginBottom: "1.5rem",
                }}
              >
                {card.body}
              </p>
              <Link href={card.href} className="hero-v2-card-link">
                {card.link}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Brand story ── */}
      <section
        className="container-pad"
        style={{
          backgroundColor: "var(--bg)",
          paddingTop: "clamp(5rem, 10vw, 9rem)",
          paddingBottom: "clamp(5rem, 10vw, 9rem)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p
            className="font-display"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--ink)",
              letterSpacing: "-0.015em",
              lineHeight: 1.15,
              marginBottom: "1.75rem",
            }}
          >
            {brandPrimary}
          </p>
          <p
            className="font-sans"
            style={{
              color: "var(--muted)",
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              lineHeight: 1.8,
              maxWidth: "52ch",
              margin: "0 auto",
            }}
          >
            {brandSecondary}
          </p>
        </div>
      </section>
    </>
  );
}
