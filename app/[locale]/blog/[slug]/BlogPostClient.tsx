"use client";

import Link from "next/link";
import type { BlogPost } from "@/utils/getBlogPosts";

interface Props {
  post: BlogPost;
  htmlContent: string;
  locale: string;
  backLabel: string;
  publishedLabel: string;
}

export default function BlogPostClient({ post, htmlContent, locale, backLabel, publishedLabel }: Props) {
  const l = (path: string) => `/${locale}${path}`;

  const formatDate = (iso: string) => {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleDateString(locale === "en" ? "en-GB" : locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  };

  return (
    <>
      <article>
        {/* Header */}
        <section className="container-pad" style={{ paddingTop: "clamp(4rem,8vw,7rem)", paddingBottom: "clamp(3rem,6vw,5rem)", borderBottom: "1px solid var(--divider)" }}>
          <div className="max-w-prose mx-auto">
            <Link
              href={l("/blog")}
              className="font-sans text-muted no-underline hover:text-ink transition-colors"
              style={{ fontSize: "0.8125rem", display: "inline-block", marginBottom: "2rem" }}
            >
              ← {backLabel}
            </Link>
            <h1 className="font-serif text-ink mb-5" style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.015em" }}>
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <span className="font-sans text-muted font-tabular" style={{ fontSize: "0.8125rem" }}>
                {publishedLabel} {formatDate(post.date)}
              </span>
              <span className="font-sans text-muted" style={{ fontSize: "0.8125rem" }}>·</span>
              <span className="font-sans text-muted" style={{ fontSize: "0.8125rem" }}>{post.author}</span>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="container-pad section-pad">
          <div className="max-w-prose mx-auto">
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </section>
      </article>

      {/* Back link */}
      <div className="container-pad" style={{ paddingBottom: "clamp(4rem,8vw,6rem)", borderTop: "1px solid var(--divider)", paddingTop: "2rem" }}>
        <div className="max-w-prose mx-auto">
          <Link href={l("/blog")} className="font-sans text-terracotta no-underline hover:underline" style={{ fontSize: "0.875rem", textUnderlineOffset: "3px" }}>
            ← {backLabel}
          </Link>
        </div>
      </div>
    </>
  );
}
