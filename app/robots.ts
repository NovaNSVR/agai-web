import type { MetadataRoute } from "next";
import { BASE_URL } from "@/utils/seo";

// Compiles to a static robots.txt at build time (supported under
// output: "export" since Next 13.3+). No robots.txt existed before this
// -- Search Console's "no referring sitemaps detected" was partly a
// direct consequence: nothing ever pointed Google at /sitemap.xml.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // These pages are locale-prefixed (e.g. /en/preview-creators-a/),
        // hence the leading wildcard -- a bare "/preview-creators-a" rule
        // wouldn't match any real URL on this site. Belt-and-suspenders
        // alongside the noindex on the pages themselves (see their
        // generateMetadata) -- robots.txt only asks crawlers not to
        // fetch the page; noindex is what actually keeps an already-known
        // URL out of the index.
        userAgent: "*",
        allow: "/",
        disallow: [
          "/*/preview-creators-a",
          "/*/preview-creators-c",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
