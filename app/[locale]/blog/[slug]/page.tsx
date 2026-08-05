import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogSlugs, hasTranslatedBlogPost } from "@/utils/getBlogPosts";
import { getDictionary } from "@/utils/getDictionary";
import { SUPPORTED_LOCALES } from "@/utils/locales";
import { marked } from "marked";
import { buildPageMetadata } from "@/utils/seo";
import BlogPostClient from "./BlogPostClient";

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  const paths: { locale: string; slug: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const slug of slugs) {
      paths.push({ locale, slug });
    }
  }
  return paths;
}

// Self-healing: hreflang only ever includes locales that actually have a
// translated content/blog/{locale}/{slug}.md file (today that's just
// "en"), and any locale WITHOUT one gets noindex,follow -- it's still
// serving the English fallback text at its own URL, not a real
// translation, so it shouldn't be indexed as if it were one. Dropping a
// real translated .md file into content/blog/{locale}/ is the entire
// "publish" step: hasTranslatedBlogPost() picks it up automatically, the
// noindex lifts and that locale joins the hreflang set on the next build
// -- no code change needed here or in sitemap.ts.
export async function generateMetadata({ params: { locale, slug } }: Props) {
  const post = getBlogPost(slug);
  if (!post) return {};
  const translatedLocales = SUPPORTED_LOCALES.filter((l) => hasTranslatedBlogPost(l, slug));
  return buildPageMetadata(locale, `blog/${slug}`, {
    title: post.title,
    description: post.excerpt,
    hreflangLocales: translatedLocales,
    noindex: !hasTranslatedBlogPost(locale, slug),
  });
}

export default async function BlogPostPage({ params: { locale, slug } }: Props) {
  const post = getBlogPost(slug);
  if (!post) notFound();

  const dict = await getDictionary(locale);
  const backLabel = (dict as Record<string, Record<string, string>>).blog?.backToBlog ?? "Back to journal";
  const publishedLabel = (dict as Record<string, Record<string, string>>).blog?.publishedOn ?? "Published";

  const htmlContent = await marked(post.content, { breaks: true });

  return (
    <BlogPostClient
      post={post}
      htmlContent={htmlContent}
      locale={locale}
      backLabel={backLabel}
      publishedLabel={publishedLabel}
    />
  );
}
