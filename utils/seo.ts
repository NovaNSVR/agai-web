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
