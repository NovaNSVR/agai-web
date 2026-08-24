import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/utils/locales";
import { pageUrl } from "@/utils/seo";
import { getBlogSlugs, hasTranslatedBlogPost } from "@/utils/getBlogPosts";

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
// - Untranslated blog post locale variants -- self-healing, see the blog
//   section below.
const PAGES = [
  "",
  "advertisers",
  "ambassador",
  "blog",
  "child-safety",
  "for-creators",
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

  // Blog posts: self-healing, same check that drives noindex in
  // blog/[slug]/page.tsx's generateMetadata. Only locales with a real
  // content/blog/{locale}/{slug}.md are included (today that's just
  // "en" for all three posts) -- including an untranslated duplicate
  // here, or cross-linking it via hreflang, would assert a translation
  // relationship that isn't real. Dropping in a real translated file is
  // the entire "publish" step; this loop and the noindex check both pick
  // it up automatically on the next build, no code change needed here.
  for (const slug of getBlogSlugs()) {
    const translatedLocales = SUPPORTED_LOCALES.filter((l) => hasTranslatedBlogPost(l, slug));
    for (const locale of translatedLocales) {
      entries.push({
        url: pageUrl(locale, `blog/${slug}`),
        alternates: {
          languages: Object.fromEntries(translatedLocales.map((l) => [l, pageUrl(l, `blog/${slug}`)])),
        },
      });
    }
  }

  return entries;
}
