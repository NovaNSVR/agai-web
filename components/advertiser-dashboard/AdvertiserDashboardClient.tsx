"use client";

/**
 * Advertiser dashboard — signup/login + account status view.
 *
 * Foundation-scope build (2026-08-23): shows account_status, nsvx_balance,
 * and wallet presence. No campaign-funding UI yet — that's why LevelStepper
 * (copied into components/ui/ alongside Card and SegmentedControl) isn't
 * used here; there's no real numeric amount to step through until a funding
 * flow exists. English-only for now — no dictionary wiring, unlike the rest
 * of this repo's fully-translated marketing pages. Flagged as a deliberate
 * scope call, not an oversight: this is authenticated account tooling on a
 * feature branch pending Petr's own review, not indexed marketing content.
 *
 * Talks to Supabase directly via fetch (no @supabase/supabase-js dependency)
 * to match the existing pattern already used by netlify/functions/signup.js
 * and advertiser-signup.js in this repo, rather than introducing a second
 * way of calling Supabase.
 */

import { useEffect, useState, type FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ykyiylphnpainoquefic.supabase.co";
// Anon/publishable key — safe to ship client-side by design, same value
// already used implicitly by this repo's Supabase Auth REST calls.
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlreWl5bHBobnBhaW5vcXVlZmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MjEyNTksImV4cCI6MjA4MzE5NzI1OX0.X4gdm4wk93vI71zv00g0q__OPIKwTGeAnccUBjK8U0A";

const SESSION_KEY = "ag_advertiser_session";

interface StoredSession {
  access_token: string;
  refresh_token: string;
}

interface Advertiser {
  id: string;
  company_name: string;
  category: string;
  contact_email: string;
  account_status: "pending" | "approved";
  nsvx_balance: string | number;
  solana_wallet_address: string | null;
}

function loadSession(): StoredSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(session: StoredSession) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

/** Returns the auth.users id for the given access token, or null if it's invalid/expired. */
async function fetchUserId(accessToken: string): Promise<string | null> {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.id ?? null;
}

async function fetchAdvertiser(accessToken: string, userId: string): Promise<Advertiser | null> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/advertisers?user_id=eq.${userId}&select=id,company_name,category,contact_email,account_status,nsvx_balance,solana_wallet_address`,
    { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${accessToken}` } }
  );
  if (!res.ok) return null;
  const rows = await res.json();
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

async function loginWithPassword(email: string, password: string): Promise<StoredSession | null> {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.access_token) return null;
  return { access_token: data.access_token, refresh_token: data.refresh_token };
}

type ViewState = "loading" | "auth" | "dashboard";
type AuthMode = "login" | "signup";
type DashboardTab = "overview" | "wallet";

export default function AdvertiserDashboardClient() {
  const [view, setView] = useState<ViewState>("loading");
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [tab, setTab] = useState<DashboardTab>("overview");
  const [advertiser, setAdvertiser] = useState<Advertiser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  async function loadDashboard(session: StoredSession) {
    const userId = await fetchUserId(session.access_token);
    if (!userId) {
      clearSession();
      setView("auth");
      return;
    }
    const row = await fetchAdvertiser(session.access_token, userId);
    if (!row) {
      setError("Account found, but no advertiser record exists for it yet.");
      setView("auth");
      return;
    }
    setAdvertiser(row);
    setView("dashboard");
  }

  useEffect(() => {
    const session = loadSession();
    if (session) {
      loadDashboard(session);
    } else {
      setView("auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/.netlify/functions/advertiser-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          company_name: companyName,
          category,
          contact_email: contactEmail,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Signup failed.");
        return;
      }
      if (!data.access_token) {
        setError("Account created, but no session was returned. Try logging in.");
        setAuthMode("login");
        return;
      }
      const session: StoredSession = { access_token: data.access_token, refresh_token: data.refresh_token };
      saveSession(session);
      await loadDashboard(session);
    } catch (err: any) {
      setError(err?.message || "Signup failed.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const session = await loginWithPassword(email, password);
      if (!session) {
        setError("Invalid email or password.");
        return;
      }
      saveSession(session);
      await loadDashboard(session);
    } catch (err: any) {
      setError(err?.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleLogout() {
    clearSession();
    setAdvertiser(null);
    setView("auth");
    setAuthMode("login");
  }

  const inputStyle = {
    background: "#FFFFFF",
    border: "1px solid #E8E6E0",
    color: "#1A1A1A",
  } as const;

  if (view === "loading") {
    return <div className="ag-dashboard-theme container-pad section-pad max-w-content mx-auto">Loading…</div>;
  }

  if (view === "auth") {
    return (
      <div className="ag-dashboard-theme container-pad section-pad max-w-prose mx-auto">
        <h1 className="text-2xl mb-6">Advertiser {authMode === "signup" ? "Sign Up" : "Log In"}</h1>

        <div className="flex gap-4 mb-6 text-sm">
          <button
            className={authMode === "signup" ? "font-semibold underline" : "text-muted"}
            onClick={() => setAuthMode("signup")}
          >
            Create account
          </button>
          <button
            className={authMode === "login" ? "font-semibold underline" : "text-muted"}
            onClick={() => setAuthMode("login")}
          >
            Log in
          </button>
        </div>

        {error && <p className="mb-4 text-sm" style={{ color: "#B0463A" }}>{error}</p>}

        {authMode === "signup" ? (
          <form onSubmit={handleSignup} className="flex flex-col gap-3">
            <input required type="text" placeholder="Company name" value={companyName}
              onChange={(e) => setCompanyName(e.target.value)} className="rounded-lg p-3" style={inputStyle} />
            <input required type="text" placeholder="Category (e.g. fitness, finance)" value={category}
              onChange={(e) => setCategory(e.target.value)} className="rounded-lg p-3" style={inputStyle} />
            <input required type="email" placeholder="Contact email" value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)} className="rounded-lg p-3" style={inputStyle} />
            <input required type="email" placeholder="Login email" value={email}
              onChange={(e) => setEmail(e.target.value)} className="rounded-lg p-3" style={inputStyle} />
            <input required type="password" placeholder="Password (min 6 characters)" value={password}
              onChange={(e) => setPassword(e.target.value)} className="rounded-lg p-3" style={inputStyle} />
            <button type="submit" disabled={submitting} className="rounded-lg p-3 mt-2 font-semibold text-white"
              style={{ background: "#3F7A5C" }}>
              {submitting ? "Creating account…" : "Create advertiser account"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input required type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} className="rounded-lg p-3" style={inputStyle} />
            <input required type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} className="rounded-lg p-3" style={inputStyle} />
            <button type="submit" disabled={submitting} className="rounded-lg p-3 mt-2 font-semibold text-white"
              style={{ background: "#3F7A5C" }}>
              {submitting ? "Logging in…" : "Log in"}
            </button>
          </form>
        )}
      </div>
    );
  }

  // view === "dashboard"
  return (
    <div className="ag-dashboard-theme container-pad section-pad max-w-content mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl">{advertiser?.company_name}</h1>
        <button onClick={handleLogout} className="text-sm underline text-muted">Log out</button>
      </div>

      <div className="max-w-xs mb-6">
        <SegmentedControl
          options={[
            { value: "overview", label: "Overview" },
            { value: "wallet", label: "Wallet" },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      {tab === "overview" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card title="Account Status">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: advertiser?.account_status === "approved" ? "#3F7A5C" : "#D88B5C",
                color: "#fff",
              }}
            >
              {advertiser?.account_status === "approved" ? "Approved" : "Pending review"}
            </span>
            {advertiser?.account_status !== "approved" && (
              <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                Your account is under review. You&apos;ll be notified once it&apos;s approved.
              </p>
            )}
          </Card>

          <Card title="NSVX Balance">
            <p className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
              {Number(advertiser?.nsvx_balance ?? 0).toLocaleString()} NSVX
            </p>
          </Card>
        </div>
      )}

      {tab === "wallet" && (
        <Card title="Wallet">
          {advertiser?.solana_wallet_address ? (
            <p className="font-mono text-sm break-all" style={{ color: "var(--text-primary)" }}>
              {advertiser.solana_wallet_address}
            </p>
          ) : (
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Wallet not yet provisioned. Contact support if this persists.
            </p>
          )}
          <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
            This wallet is currently inactive — on-chain settlement has not been enabled.
          </p>
        </Card>
      )}
    </div>
  );
}
