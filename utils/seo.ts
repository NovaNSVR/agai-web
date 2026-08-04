import type { Metadata } from "next";
import { SUPPORTED_LOCALES } from "./locales";

export const SITE_NAME = "AlphaGlow AI";
export const BASE_URL = "https://alphaglowai.com";
export const DEFAULT_TITLE = "AlphaGlow AI — The Creator Economy Platform";
export const DEFAULT_DESCRIPTION =
  "AlphaGlow AI is the creator economy platform where creators publish AI-powered sessions, build a Digital Twin with Nova, and earn NSVX when their audience grows.";

export const OG_IMAGE = {
  url: `${BASE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "AlphaGlow AI — The Creator Economy Platform",
};

export function buildOpenGraph(url: string) {
  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url,
    siteName: SITE_NAME,
    type: "website" as const,
    images: [OG_IMAGE],
  };
}

export function buildTwitter() {
  return {
    card: "summary_large_image" as const,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  };
}

// Normalizes a page path (with or without leading/trailing slashes, or
// empty for the homepage) into the trailing-slash form every URL on this
// site uses (next.config.mjs sets trailingSlash: true).
function normalizePagePath(pagePath: string): string {
  const trimmed = pagePath.replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}/` : "/";
}

export function pageUrl(locale: string, pagePath: string): string {
  return `${BASE_URL}/${locale}${normalizePagePath(pagePath)}`;
}

// Single source of truth for a page's canonical + cross-locale hreflang.
// Every real content page must call this with its own path (the segment
// after the locale, e.g. "investors", "legal/privacy", "" for the
// homepage) so its canonical points at itself and its hreflang alternates
// point at the equivalent page in each locale — not, as the previous
// layout-level implementation did, at every locale's homepage regardless
// of which page was actually being rendered. One shared function so this
// can't drift back out of sync page-by-page.
export function buildPageMetadata(
  locale: string,
  pagePath: string,
  overrides?: { title?: string; description?: string; skipHreflang?: boolean }
): Metadata {
  const canonicalUrl = pageUrl(locale, pagePath);

  // skipHreflang: for the small set of pages that exist at all 10 locale
  // URLs but don't yet have real translated content at 9 of them (the blog
  // posts — see content/blog/en/, no other locale directory exists yet).
  // Asserting hreflang equivalence between pages that serve identical
  // English text would tell Google these are translations of each other
  // when they aren't — worse than omitting hreflang entirely. Canonical
  // still points at itself either way; only the cross-locale linking is
  // suppressed.
  const alternates: Metadata["alternates"] = overrides?.skipHreflang
    ? { canonical: canonicalUrl }
    : {
        canonical: canonicalUrl,
        languages: {
          ...Object.fromEntries(SUPPORTED_LOCALES.map((l) => [l, pageUrl(l, pagePath)])),
          "x-default": pageUrl("en", pagePath),
        },
      };

  return {
    ...(overrides?.title ? { title: overrides.title } : {}),
    ...(overrides?.description ? { description: overrides.description } : {}),
    alternates,
    openGraph: buildOpenGraph(canonicalUrl),
    twitter: buildTwitter(),
  };
}
