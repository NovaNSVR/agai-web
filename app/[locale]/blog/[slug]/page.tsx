import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogSlugs } from "@/utils/getBlogPosts";
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

// skipHreflang: true unconditionally, on every locale including "en" --
// there is only one real translation (English, content/blog/en/), so
// there is no genuine cross-locale equivalence to assert anywhere. The 9
// non-English URLs currently serve that same English text verbatim; see
// the sitemap/robots writeup for how those URLs are handled until real
// translations exist. Canonical still points at the exact URL being
// served, locale included, so each of the 10 URLs is self-referential.
export async function generateMetadata({ params: { locale, slug } }: Props) {
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildPageMetadata(locale, `blog/${slug}`, {
    title: post.title,
    description: post.excerpt,
    skipHreflang: true,
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
