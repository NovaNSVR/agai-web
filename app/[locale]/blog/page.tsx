import Link from "next/link";
import { getDictionary } from "@/utils/getDictionary";
import { flatten } from "@/utils/flattenDict";
import { getBlogPosts } from "@/utils/getBlogPosts";
import { buildPageMetadata } from "@/utils/seo";
import BlogIndex from "./BlogIndex";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props) {
  return buildPageMetadata(locale, "blog");
}

export default async function BlogPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  const msgs = flatten(dict as Record<string, unknown>);
  const posts = getBlogPosts();

  return <BlogIndex posts={posts} messages={msgs} locale={locale} />;
}
