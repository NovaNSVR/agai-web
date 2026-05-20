"use client";

import { useState } from "react";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  required?: boolean;
  options?: string[];
}

interface ContactFormProps {
  formName: string;
  fields: FormField[];
  submitLabel: string;
  successMessage: string;
  errorMessage?: string;
}

export default function ContactForm({
  formName,
  fields,
  submitLabel,
  successMessage,
  errorMessage = "Something went wrong. Please try again.",
}: ContactFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const body = new URLSearchParams({ "form-name": formName, ...values });
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (res.ok || res.status === 303) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-divider rounded bg-surface text-center" style={{ padding: "3rem 2rem" }}>
        <p className="font-sans text-ink" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
          {successMessage}
        </p>
      </div>
    );
  }

  const inputStyle = {
    padding: "10px 12px",
    fontSize: "0.875rem",
    border: "1px solid var(--divider)",
    borderRadius: 6,
    background: "var(--surface)",
    color: "var(--ink)",
    width: "100%",
    outline: "none",
    fontFamily: "inherit",
  } as React.CSSProperties;

  return (
    <form
      name={formName}
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      <input type="hidden" name="form-name" value={formName} />
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-2">
          <label
            htmlFor={field.name}
            className="font-sans text-ink"
            style={{ fontSize: "0.8125rem", fontWeight: 500 }}
          >
            {field.label}
            {field.required && <span className="text-terracotta"> *</span>}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              rows={5}
              style={{ ...inputStyle, resize: "vertical" }}
              onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
            />
          ) : field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              style={inputStyle}
              onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
            >
              <option value="">—</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              style={inputStyle}
              onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
            />
          )}
        </div>
      ))}
      {error && (
        <p className="font-sans text-brick" style={{ fontSize: "0.875rem" }}>
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="font-sans text-surface rounded"
        style={{
          backgroundColor: submitting ? "var(--muted)" : "var(--terracotta)",
          fontSize: "0.9375rem",
          fontWeight: 500,
          padding: "12px 24px",
          width: "fit-content",
          cursor: submitting ? "not-allowed" : "pointer",
          border: "none",
          transition: "background-color 0.15s",
        }}
      >
        {submitting ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
