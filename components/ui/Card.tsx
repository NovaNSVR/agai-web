// Verbatim copy of NEW-AGAI-Base's components/ui/Card.tsx — reused here per
// explicit build instruction rather than inventing a separate design system
// for the advertiser dashboard. Keep in sync by hand if the source changes.
"use client";

import { ReactNode } from "react";

export function Card({
  title,
  subtitle,
  children,
  accentBorder,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  accentBorder?: string;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${accentBorder ?? "var(--border-primary)"}`,
        boxShadow: "var(--shadow-card)",
      }}
    >
      {title && (
        <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          {subtitle}
        </p>
      )}
      <div className={title || subtitle ? "mt-4" : undefined}>{children}</div>
    </div>
  );
}
