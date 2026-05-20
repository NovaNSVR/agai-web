"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/utils/i18n";
import type { BlogPost } from "@/utils/getBlogPosts";
import type { FlatMessages } from "@/utils/flattenDict";

const CATEGORIES = ["all", "nova-insights", "platform-updates", "creator-spotlights"] as const;
type Category = typeof CATEGORIES[number];

const CATEGORY_KEY: Record<Category, string> = {
  all: "blog.categoryAll",
  "nova-insights": "blog.categoryNovaInsights",
  "platform-updates": "blog.categoryPlatformUpdates",
  "creator-spotlights": "blog.categoryCreatorSpotlights",
};

interface Props {
  posts: BlogPost[];
  messages: FlatMessages;
  locale: string;
}

export default function BlogIndex({ posts, locale }: Props) {
  const { t } = useI18n();
  const [active, setActive] = useState<Category>("all");
  const l = (path: string) => `/${locale}${path}`;

  const filtered = active === "all" ? posts : posts.filter((p) => p.category === active);

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
      {/* Hero */}
      <section className="container-pad" style={{ paddingTop: "clamp(5rem,10vw,8rem)", paddingBottom: "clamp(3rem,6vw,5rem)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-content mx-auto">
          <h1 className="font-serif text-ink mb-3" style={{ fontSize: "clamp(2rem,5vw,3rem)", lineHeight: 1.12, letterSpacing: "-0.018em" }}>
            {t("blog.heroHeading")}
          </h1>
          <p className="font-sans text-muted" style={{ fontSize: "1rem", lineHeight: 1.6 }}>{t("blog.heroBody")}</p>
        </div>
      </section>

      {/* Category filter */}
      <section className="container-pad" style={{ paddingTop: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--divider)", background: "var(--surface)" }}>
        <div className="max-w-content mx-auto flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="font-sans rounded"
              style={{
                fontSize: "0.8125rem",
                padding: "6px 14px",
                border: "1px solid var(--divider)",
                background: active === cat ? "var(--ink)" : "transparent",
                color: active === cat ? "var(--surface)" : "var(--muted)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {t(CATEGORY_KEY[cat])}
            </button>
          ))}
        </div>
      </section>

      {/* Post grid */}
      <section className="container-pad section-pad">
        <div className="max-w-content mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center" style={{ padding: "4rem 0" }}>
              <h2 className="font-serif text-ink mb-3" style={{ fontSize: "1.5rem" }}>{t("blog.noPostsHeading")}</h2>
              <p className="font-sans text-muted" style={{ fontSize: "0.9375rem" }}>{t("blog.noPostsBody")}</p>
            </div>
          ) : (
            <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", background: "var(--divider)", border: "1px solid var(--divider)" }}>
              {filtered.map((post) => (
                <Link
                  key={post.slug}
                  href={l(`/blog/${post.slug}`)}
                  className="bg-surface no-underline group"
                  style={{ padding: "2rem 1.75rem", display: "block" }}
                >
                  <span
                    className="font-sans uppercase inline-block mb-3"
                    style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", fontWeight: 500, color: "var(--terracotta)" }}
                  >
                    {t(CATEGORY_KEY[post.category as Category] ?? "blog.categoryPlatformUpdates")}
                  </span>
                  <h2
                    className="font-serif text-ink mb-3 group-hover:underline"
                    style={{ fontSize: "1.125rem", fontWeight: 400, lineHeight: 1.4, textUnderlineOffset: "3px" }}
                  >
                    {post.title}
                  </h2>
                  <p className="font-sans text-muted mb-5" style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>
                    {post.excerpt}
                  </p>
                  <span className="font-sans text-muted font-tabular" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                    {formatDate(post.date)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
