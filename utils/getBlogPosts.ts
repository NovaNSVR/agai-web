import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: "nova-insights" | "platform-updates" | "creator-spotlights";
  author: string;
  content: string;
}

// Blog posts are English-first; all locales show EN content initially.
const BLOG_DIR = path.join(process.cwd(), "content/blog/en");

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: (data.title as string) ?? file,
        date: (data.date as string) ?? "",
        excerpt: (data.excerpt as string) ?? "",
        category: (data.category as BlogPost["category"]) ?? "platform-updates",
        author: (data.author as string) ?? "AlphaGlow",
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    category: (data.category as BlogPost["category"]) ?? "platform-updates",
    author: (data.author as string) ?? "AlphaGlow",
    content,
  };
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
