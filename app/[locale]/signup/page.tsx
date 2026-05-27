"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useI18n } from "@/utils/i18n";

type FormState = "idle" | "loading" | "success" | "error";

const APP_STORE_URL = "https://apps.apple.com/app/alphaglow/id6738273676";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.alphaglowai";

export default function SignupPage() {
  const { locale } = useI18n();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMsg("");

      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match.");
        return;
      }
      if (password.length < 6) {
        setErrorMsg("Password must be at least 6 characters.");
        return;
      }
      if (username.length < 3) {
        setErrorMsg("Username must be at least 3 characters.");
        return;
      }

      setState("loading");

      try {
        const res = await fetch("/.netlify/functions/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, username }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setErrorMsg(data.error || "Something went wrong. Please try again.");
          setState("error");
          return;
        }

        setState("success");
      } catch {
        setErrorMsg("Network error. Please check your connection and try again.");
        setState("error");
      }
    },
    [email, username, password, confirmPassword]
  );

  if (state === "success") {
    return (
      <div className="container-pad section-pad">
        <div className="max-w-content mx-auto" style={{ maxWidth: 520 }}>
          <div className="border border-divider rounded" style={{ padding: "2.5rem 2rem" }}>
            <p
              className="font-sans text-terracotta uppercase mb-4"
              style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", fontWeight: 500 }}
            >
              Account created
            </p>
            <h1
              className="font-serif text-ink"
              style={{ fontSize: "clamp(1.75rem,4vw,2.25rem)", lineHeight: 1.15, marginBottom: "1rem" }}
            >
              Welcome to AlphaGlow
            </h1>
            <p
              className="font-sans text-muted"
              style={{ fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}
            >
              Your account and Solana wallet are ready. Open the AlphaGlow app
              to start earning NSVX tokens, explore creator sessions, and build
              your wellness practice.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={APP_STORE_URL}
                className="font-sans no-underline text-surface rounded text-center"
                style={{
                  backgroundColor: "var(--terracotta)",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  padding: "14px 24px",
                }}
              >
                Download on the App Store
              </a>
              <a
                href={PLAY_STORE_URL}
                className="font-sans no-underline text-ink rounded border border-divider text-center"
                style={{ fontSize: "0.9375rem", padding: "14px 24px" }}
              >
                Get it on Google Play
              </a>
            </div>
            <p className="font-sans text-muted mt-6" style={{ fontSize: "0.875rem" }}>
              Already have the app?{" "}
              <a
                href="https://alphaglowai.app"
                className="text-terracotta no-underline hover:underline"
                style={{ textUnderlineOffset: "3px" }}
              >
                Sign in at alphaglowai.app
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-pad section-pad">
      <div className="max-w-content mx-auto" style={{ maxWidth: 520 }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <p
            className="font-sans text-terracotta uppercase mb-4"
            style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", fontWeight: 500 }}
          >
            Create account
          </p>
          <h1
            className="font-serif text-ink"
            style={{ fontSize: "clamp(2rem,5vw,2.75rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            Join AlphaGlow
          </h1>
          <p className="font-sans text-muted mt-3" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
            Create your account and Solana wallet in one step.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-sans text-ink"
              style={{ fontSize: "0.875rem", fontWeight: 500 }}
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={state === "loading"}
              placeholder="you@example.com"
              className="font-sans border border-divider rounded bg-surface text-ink"
              style={{
                padding: "12px 14px",
                fontSize: "0.9375rem",
                outline: "none",
                width: "100%",
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="font-sans text-ink"
              style={{ fontSize: "0.875rem", fontWeight: 500 }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              minLength={3}
              maxLength={30}
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
              disabled={state === "loading"}
              placeholder="your_handle"
              className="font-sans border border-divider rounded bg-surface text-ink"
              style={{
                padding: "12px 14px",
                fontSize: "0.9375rem",
                outline: "none",
                width: "100%",
              }}
            />
            <p className="font-sans text-muted" style={{ fontSize: "0.8125rem" }}>
              Lowercase letters, numbers, and underscores only.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="font-sans text-ink"
              style={{ fontSize: "0.875rem", fontWeight: 500 }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={state === "loading"}
              placeholder="At least 6 characters"
              className="font-sans border border-divider rounded bg-surface text-ink"
              style={{
                padding: "12px 14px",
                fontSize: "0.9375rem",
                outline: "none",
                width: "100%",
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirm-password"
              className="font-sans text-ink"
              style={{ fontSize: "0.875rem", fontWeight: 500 }}
            >
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={state === "loading"}
              placeholder="Repeat your password"
              className="font-sans border border-divider rounded bg-surface text-ink"
              style={{
                padding: "12px 14px",
                fontSize: "0.9375rem",
                outline: "none",
                width: "100%",
              }}
            />
          </div>

          {(state === "error" || errorMsg) && (
            <div
              className="font-sans rounded border"
              style={{
                padding: "12px 14px",
                fontSize: "0.875rem",
                color: "#b91c1c",
                borderColor: "#fecaca",
                backgroundColor: "#fef2f2",
                lineHeight: 1.5,
              }}
            >
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={state === "loading"}
            className="font-sans rounded text-surface"
            style={{
              backgroundColor: state === "loading" ? "#c4856a" : "var(--terracotta)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              padding: "14px 24px",
              cursor: state === "loading" ? "not-allowed" : "pointer",
              border: "none",
              transition: "background-color 0.15s",
            }}
          >
            {state === "loading" ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="font-sans text-muted mt-6" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
          Already have an account?{" "}
          <a
            href="https://alphaglowai.app"
            className="text-terracotta no-underline hover:underline"
            style={{ textUnderlineOffset: "3px" }}
          >
            Sign in at alphaglowai.app
          </a>
        </p>

        <p className="font-sans text-muted mt-4" style={{ fontSize: "0.75rem", lineHeight: 1.6 }}>
          By creating an account you agree to our{" "}
          <Link
            href={`/${locale}/legal`}
            className="no-underline hover:underline"
            style={{ textUnderlineOffset: "3px", color: "inherit" }}
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={`/${locale}/legal`}
            className="no-underline hover:underline"
            style={{ textUnderlineOffset: "3px", color: "inherit" }}
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
