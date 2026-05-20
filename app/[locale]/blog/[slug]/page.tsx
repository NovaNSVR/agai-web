import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogSlugs } from "@/utils/getBlogPosts";
import { getDictionary } from "@/utils/getDictionary";
import { SUPPORTED_LOCALES } from "@/utils/locales";
import { marked } from "marked";
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

export async function generateMetadata({ params: { slug } }: Props) {
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
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
