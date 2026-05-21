"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/utils/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);

  const l = (path: string) => `/${locale}${path}`;
  const app = (path = "") => `https://alphaglowai.app${path}?lang=${locale}`;

  const NAV_LINKS = [
    { href: l("/for-users"), label: t("nav.forUsers") },
    { href: l("/for-creators"), label: t("nav.forCreators") },
    { href: l("/advertisers"), label: t("nav.advertisers") },
    { href: l("/nova"), label: t("nav.nova") },
    { href: l("/nsvx"), label: t("nav.nsvx") },
    { href: l("/pricing"), label: t("nav.pricing") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg border-b border-divider">
      <div
        className="max-w-content mx-auto container-pad flex items-center justify-between"
        style={{ height: 60 }}
      >
        {/* Wordmark */}
        <Link
          href={l("/")}
          className="font-serif text-ink no-underline"
          style={{ fontSize: "1.1rem", letterSpacing: "0.02em" }}
        >
          AlphaGlow
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-muted no-underline hover:text-ink transition-colors"
              style={{ fontSize: "0.875rem" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href={app("/sign-in")}
            className="font-sans text-muted no-underline hover:text-ink transition-colors"
            style={{ fontSize: "0.875rem" }}
          >
            {t("nav.signIn")}
          </Link>
          <Link
            href={app()}
            className="font-sans no-underline text-surface rounded"
            style={{
              backgroundColor: "var(--terracotta)",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "8px 18px",
            }}
          >
            {t("nav.openApp")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
        >
          <span
            className="block w-5 h-px bg-ink transition-transform origin-center"
            style={{ transform: open ? "translateY(4px) rotate(45deg)" : undefined }}
          />
          <span className="block w-5 h-px bg-ink" style={{ opacity: open ? 0 : 1 }} />
          <span
            className="block w-5 h-px bg-ink transition-transform origin-center"
            style={{ transform: open ? "translateY(-4px) rotate(-45deg)" : undefined }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-bg border-t border-divider container-pad py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-sans text-ink no-underline"
              style={{ fontSize: "1rem" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-divider pt-5 flex flex-col gap-4">
            <LanguageSwitcher />
            <Link
              href={app("/sign-in")}
              onClick={() => setOpen(false)}
              className="font-sans text-muted no-underline"
              style={{ fontSize: "0.875rem" }}
            >
              {t("nav.signIn")}
            </Link>
            <Link
              href={app()}
              onClick={() => setOpen(false)}
              className="font-sans no-underline text-surface rounded text-center"
              style={{
                backgroundColor: "var(--terracotta)",
                fontSize: "0.875rem",
                fontWeight: 500,
                padding: "12px 20px",
              }}
            >
              {t("nav.openApp")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
