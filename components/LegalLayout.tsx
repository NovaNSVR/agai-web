import Link from "next/link";
import type { TFn } from "@/utils/serverT";

const LEGAL_KEYS = [
  { path: "/legal/terms", key: "legalHub.terms" },
  { path: "/legal/privacy", key: "legalHub.privacy" },
  { path: "/legal/ai-disclaimer", key: "legalHub.aiDisclaimer" },
  { path: "/legal/health-disclaimer", key: "legalHub.healthDisclaimer" },
  { path: "/legal/creator-agreement", key: "legalHub.creatorAgreement" },
  { path: "/legal/nsvx-disclaimer", key: "legalHub.nsvxDisclaimer" },
];

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
  currentSuffix: string;
  locale: string;
  tFn: TFn;
}

export default function LegalLayout({ title, lastUpdated, children, currentSuffix, locale, tFn }: LegalLayoutProps) {
  const t = tFn;
  const l = (path: string) => `/${locale}${path}`;

  return (
    <div className="max-w-content mx-auto container-pad section-pad">
      <div className="flex flex-col md:flex-row gap-12 md:gap-16">
        {/* Sidebar TOC */}
        <aside className="md:w-52 shrink-0">
          <nav className="sticky top-20 flex flex-col gap-0.5">
            <span
              className="font-sans text-muted uppercase mb-3"
              style={{ fontSize: "0.6875rem", letterSpacing: "0.1em" }}
            >
              {t("legalHub.navTitle")}
            </span>
            {LEGAL_KEYS.map((item) => {
              const active = currentSuffix === item.path;
              return (
                <Link
                  key={item.path}
                  href={l(item.path)}
                  className="font-sans no-underline rounded transition-colors"
                  style={{
                    fontSize: "0.8125rem",
                    padding: "6px 10px",
                    color: active ? "var(--ink)" : "var(--muted)",
                    backgroundColor: active ? "var(--divider)" : "transparent",
                    fontWeight: active ? 500 : 400,
                    lineHeight: 1.4,
                  }}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <article className="flex-1 min-w-0">
          <header className="mb-10 pb-8 border-b border-divider">
            <h1
              className="font-serif text-ink"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 400, marginBottom: "0.5rem" }}
            >
              {title}
            </h1>
            <p className="font-sans text-muted font-tabular" style={{ fontSize: "0.8125rem" }}>
              {t("legalHub.lastUpdated", { date: lastUpdated })}
            </p>
          </header>
          <div className="font-sans text-ink legal-prose" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>
            {children}
          </div>
        </article>
      </div>
    </div>
  );
}
