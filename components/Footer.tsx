"use client";

import Link from "next/link";
import { useI18n } from "@/utils/i18n";

export default function Footer() {
  const { t, locale } = useI18n();
  const l = (path: string) => `/${locale}${path}`;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-divider bg-bg container-pad" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      <div className="max-w-content mx-auto">
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-0 justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <span className="font-serif text-ink" style={{ fontSize: "1.05rem" }}>AlphaGlow AI</span>
            <p className="font-sans text-muted" style={{ fontSize: "0.8125rem", maxWidth: 240, lineHeight: 1.6 }}>
              {t("footer.tagline")}
            </p>
            <p className="font-sans text-muted font-tabular" style={{ fontSize: "0.75rem", marginTop: 4 }}>
              {t("footer.copyright", { year })}
            </p>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-2">
            <span className="font-sans text-muted uppercase" style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", marginBottom: 4 }}>
              {t("footer.platform")}
            </span>
            {[
              { href: l("/for-creators"), key: "nav.forCreators" },
              { href: l("/for-listeners"), key: "nav.forListeners" },
              { href: l("/how-nsvx-works"), key: "nav.howNsvxWorks" },
              { href: l("/pricing"), key: "nav.pricing" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="font-sans text-muted no-underline hover:text-ink transition-colors" style={{ fontSize: "0.8125rem" }}>
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2">
            <span className="font-sans text-muted uppercase" style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", marginBottom: 4 }}>
              {t("footer.legal")}
            </span>
            {[
              { href: l("/legal/terms"), key: "legalHub.terms" },
              { href: l("/legal/privacy"), key: "legalHub.privacy" },
              { href: l("/legal/ai-disclaimer"), key: "legalHub.aiDisclaimer" },
              { href: l("/legal/health-disclaimer"), key: "legalHub.healthDisclaimer" },
              { href: l("/legal/creator-agreement"), key: "legalHub.creatorAgreement" },
              { href: l("/legal/nsvx-disclaimer"), key: "legalHub.nsvxDisclaimer" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="font-sans text-muted no-underline hover:text-ink transition-colors" style={{ fontSize: "0.8125rem" }}>
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Get started */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-muted uppercase" style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", marginBottom: 4 }}>
              {t("footer.getStarted")}
            </span>
            <Link
              href="https://alphaglowai.app"
              className="font-sans no-underline text-surface rounded text-center"
              style={{ backgroundColor: "var(--terracotta)", fontSize: "0.8125rem", fontWeight: 500, padding: "10px 20px" }}
            >
              {t("footer.openApp")}
            </Link>
            <Link
              href="https://alphaglowai.app/sign-in"
              className="font-sans text-muted no-underline hover:text-ink transition-colors text-center"
              style={{ fontSize: "0.8125rem" }}
            >
              {t("footer.signIn")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
