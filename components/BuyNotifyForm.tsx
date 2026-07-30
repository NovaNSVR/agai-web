"use client";

import { useState } from "react";

interface BuyNotifyFormProps {
  notifyLabel: string;
  notifyCta: string;
  notifySuccess: string;
}

export default function BuyNotifyForm({ notifyLabel, notifyCta, notifySuccess }: BuyNotifyFormProps) {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);

  if (notified) {
    return <p className="font-sans text-moss" style={{ fontSize: "0.875rem" }}>{notifySuccess}</p>;
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setNotified(true); }} className="flex gap-3 flex-wrap">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={notifyLabel}
        className="font-sans text-ink border border-divider rounded bg-surface flex-1"
        style={{ padding: "10px 12px", fontSize: "0.875rem", minWidth: 200 }}
      />
      <button
        type="submit"
        className="font-sans text-surface rounded"
        style={{ backgroundColor: "var(--terracotta)", fontSize: "0.875rem", fontWeight: 600, padding: "10px 20px", border: "none", cursor: "pointer" }}
      >
        {notifyCta}
      </button>
    </form>
  );
}
