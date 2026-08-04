import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/utils/locales";
import { pageUrl } from "@/utils/seo";
import { getBlogSlugs } from "@/utils/getBlogPosts";

// Compiles to a static sitemap.xml at build time (output: "export" in
// next.config.mjs supports app/sitemap.ts since Next 13.3+) -- this list
// is the real route table, so a page added or removed here is reflected
// automatically instead of drifting from a hand-maintained XML file.
//
// Real, translated pages: every locale variant included, with per-entry
// hreflang alternates cross-linking the equivalent page in the other 9
// locales -- mirrors utils/seo.ts:buildPageMetadata() exactly, since both
// read from this same PAGES list.
//
// Deliberately excluded:
// - "legal" -- redirects to "legal/terms", never rendered; sitemaps
//   should list the destination, not the redirect (already included).
// - "preview-creators-a/b/c" -- internal design previews, noindex'd
//   directly on those pages (see their generateMetadata).
// - The 9 non-English blog post URLs -- see the blog section below.
const PAGES = [
  "",
  "advertisers",
  "ambassador",
  "blog",
  "child-safety",
  "for-creators",
  "for-listeners",
  "for-users",
  "how-nsvx-works",
  "investors",
  "legal/ai-disclaimer",
  "legal/creator-agreement",
  "legal/health-disclaimer",
  "legal/nsvx-disclaimer",
  "legal/privacy",
  "legal/terms",
  "nova",
  "nsvx",
  "press",
  "pricing",
  "privacy",
  "signup",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    for (const locale of SUPPORTED_LOCALES) {
      entries.push({
        url: pageUrl(locale, page),
        alternates: {
          languages: Object.fromEntries(
            SUPPORTED_LOCALES.map((l) => [l, pageUrl(l, page)])
          ),
        },
      });
    }
  }

  // Blog posts: English only. The other 9 locale URLs currently serve
  // identical English text (no translated content exists yet -- see
  // content/blog/en/ and utils/getBlogPosts.ts) -- including them here,
  // or cross-linking them via hreflang, would assert a translation
  // relationship that isn't real. Once real per-locale blog content
  // exists, add those locales back into this loop the same way the
  // PAGES loop above works.
  for (const slug of getBlogSlugs()) {
    entries.push({ url: pageUrl("en", `blog/${slug}`) });
  }

  return entries;
}
