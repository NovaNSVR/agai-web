"use client";

import { useState } from "react";

export interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border border-divider rounded overflow-hidden" style={{ maxWidth: 720 }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: i < items.length - 1 ? "1px solid var(--divider)" : undefined }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left bg-surface font-sans text-ink flex justify-between items-start gap-4"
            style={{ padding: "1.25rem 1.5rem", fontSize: "0.9375rem", lineHeight: 1.5 }}
          >
            <span>{item.q}</span>
            <span
              className="font-sans text-muted"
              style={{ flexShrink: 0, fontSize: "1.125rem", lineHeight: 1, marginTop: 2 }}
            >
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div
              className="bg-surface font-sans text-muted"
              style={{ padding: "0 1.5rem 1.25rem", fontSize: "0.875rem", lineHeight: 1.75 }}
            >
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
