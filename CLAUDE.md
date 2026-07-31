# AlphaGlow Web (agai-web) — Project Guide

## Overview
- **Repo:** NovaNSVR/agai-web
- **Live domain:** alphaglowai.com + www.alphaglowai.com
- **Staging:** agai-web.netlify.app
- **Netlify site ID:** 3c2ccbb0-5118-418b-a718-42c6f755e3dd
- **Stack:** Next.js 14, TypeScript, Tailwind CSS, `output: "export"` (fully static)
- **Working dir:** `C:\ai-tools\agai-web`

## Important: Read this at the start of every agai-web session.
## Update this file before every push to main with new routes, components, or architecture decisions.

## Commands
```
npm run dev          # local dev server
npm run build        # static export to out/
npm run lint         # TypeScript + lint check
```

## Deploy
- Two branches: `staging` (auto-deploys to `staging--agai-web.netlify.app`) and `main` (auto-deploys to `alphaglowai.com` production)
- Standard flow: branch off `staging` → build/verify → merge `--no-ff` into `staging` → push `staging` → verify live on staging URL → only on Petr's explicit "push" (to main) → merge `staging` into `main` → push → verify live on production
- Build command: `npm run build`
- Publish dir: `out`
- Netlify auth token (env): `nfc_jeF9Yyi3fJHaiyc1SgDzyY3dvdkhTX16f3c0`

## Toolchain Rules (non-negotiable)
1. **Playwright at 390px** — verify every new page visually before any push
2. **code-review-graph** — run detect_changes + get_review_context on diff before committing
3. **frontend-design skill** — use for any visual/UI decisions
4. **NEVER push without Petr's explicit "push" approval** — this applies separately to staging and to main; main additionally requires Petr's own review/tap-test of staging first
5. **npm run build must pass** — zero errors before any commit
6. **Batch all changes** — one commit per feature, never incremental pushes
7. **After every merge to main, update this file and note the current state** — per the standing cross-repo rule in NEW-AGAI-Base's CLAUDE.md, do this automatically, without being asked

## Architecture

### Static Export
- `next.config.mjs`: `output: "export"`, `trailingSlash: true`
- All pages generate to `out/` at build time
- No server-side runtime — pure CDN delivery
- API routes are NOT supported — use Netlify Forms for forms

### i18n System
- 10 locales: en, cs, sk, de, es, fr, pt, it, pl, nl
- Route: `app/[locale]/...` — every page lives under a locale prefix
- `utils/locales.ts` — SUPPORTED_LOCALES, Locale type, LOCALE_NAMES
- `utils/i18n.tsx` — I18nProvider (client), useI18n() hook, t() function
- `utils/getDictionary.ts` — server-side dict loader (used in layout for SSG)
- `utils/flattenDict.ts` — flatten nested JSON to dot-notation flat map
- `app/[locale]/layout.tsx` — async Server Component: loads dict, passes initialMessages to I18nProvider (prevents raw-key flash)
- Locale files: `locales/[locale].json` — one file per locale with ALL keys (PWA app + website)
- **No raw-key flash**: initialMessages pre-loaded at SSG time

### Adding new translations
1. Add English keys to `locales/en.json` (in the relevant namespace object)
2. Run `node scripts/translate-new-keys.mjs` with ANTHROPIC_API_KEY in env — auto-translates all 9 locales via Claude Haiku
3. Script is idempotent — only translates keys missing from each locale

### Blog System
- Posts: `content/blog/en/*.md` — MDX frontmatter + markdown content
- Server utility: `utils/getBlogPosts.ts` — reads posts from disk using `fs` (server only)
- Blog index: `app/[locale]/blog/page.tsx` (Server Component) + `BlogIndex.tsx` (Client Component)
- Blog post: `app/[locale]/blog/[slug]/page.tsx` (Server Component) + `BlogPostClient.tsx` (Client Component)
- Uses `gray-matter` for frontmatter, `marked` for markdown→HTML
- English-first: all locales show EN content initially
- Frontmatter fields: `title`, `date`, `excerpt`, `category`, `author`
- Categories: `nova-insights` | `platform-updates` | `creator-spotlights`
- To add a post: create `content/blog/en/[slug].md` and rebuild

### Forms
- **Netlify Forms** for all contact/enquiry forms (static export — no API routes)
- Add `data-netlify="true"` to `<form>` tag + `<input type="hidden" name="form-name" value="..." />`
- Form submissions visible in Netlify dashboard → Forms
- `components/ContactForm.tsx` — reusable Netlify-compatible form component

## Page Routes

| Route | File | Status |
|-------|------|--------|
| `/[locale]/` | `app/[locale]/page.tsx` | Live |
| `/[locale]/for-users/` | `app/[locale]/for-users/page.tsx` | Live (2026-05-20) |
| `/[locale]/for-creators/` | `app/[locale]/for-creators/page.tsx` | Live, expanded (2026-05-20) |
| `/[locale]/advertisers/` | `app/[locale]/advertisers/page.tsx` | Live (2026-05-20) |
| `/[locale]/nova/` | `app/[locale]/nova/page.tsx` | Live (2026-05-20) |
| `/[locale]/nsvx/` | `app/[locale]/nsvx/page.tsx` | Live (2026-05-20) |
| `/[locale]/investors/` | `app/[locale]/investors/page.tsx` | Live — fully rebuilt 2026-07-31, see Incident Log |
| `/[locale]/press/` | `app/[locale]/press/page.tsx` | Live (2026-05-20) |
| `/[locale]/blog/` | `app/[locale]/blog/page.tsx` | Live (2026-05-20) |
| `/[locale]/blog/[slug]/` | `app/[locale]/blog/[slug]/page.tsx` | Live (2026-05-20) |
| `/[locale]/pricing/` | `app/[locale]/pricing/page.tsx` | Live |
| `/[locale]/ambassador/` | `app/[locale]/ambassador/page.tsx` | Live — commission economics corrected 2026-07-31, see Incident Log |
| `/[locale]/how-nsvx-works/` | `app/[locale]/how-nsvx-works/page.tsx` | Legacy (kept) |
| `/[locale]/for-listeners/` | `app/[locale]/for-listeners/page.tsx` | Legacy (kept) |
| `/[locale]/legal/...` | `app/[locale]/legal/` | Live |
| `/[locale]/privacy/` | `app/[locale]/privacy/page.tsx` | Live (2026-06-01) — standalone dark-theme privacy page |

## Components

| File | Purpose |
|------|---------|
| `components/Nav.tsx` | Sticky top nav — 9 links: For Users, For Creators, Advertisers, Investors, Nova, NSVX, Pricing, Ambassador Program, Press (Investors/Press added 2026-07-31) |
| `components/Footer.tsx` | 5-column footer (Brand, Platform, Company, Legal, Get Started) |
| `components/FAQ.tsx` | Accordion FAQ — takes `items: {q, a}[]` |
| `components/ContactForm.tsx` | Netlify Forms wrapper — takes fields + formName |
| `components/LanguageSwitcher.tsx` | Locale dropdown |
| `components/LegalLayout.tsx` | Wrapper for legal prose pages |

## Design System

### Colors
- `--bg: #FAFAF7` (cream page background)
- `--surface: #FFFFFF` (card/box background)
- `--ink: #1A1A1A`, `--muted: #5C5C5A`, `--divider: #E8E6E0`
- `--terracotta: #D88B5C` — the ONE accent color sitewide (CTAs, badges, stat numbers, links). As of 2026-07-31, `--amber`, `--gold`, `--nova-teal`, `--nova-teal-dim` have been removed entirely (from both `globals.css` and the Tailwind `amber` color) — every former teal/gold/amber usage was converted to terracotta. Do not reintroduce a second accent color without an explicit decision from Petr.
- `--moss: #3F7A5C` (positive/earn values, e.g. How NSVX Works) and `--brick: #B0463A` remain — unrelated to the teal/gold removal, still valid
- Dark sections (`--dark-bg: #060F0F`, `--dark-ink`, `--dark-muted`, `--dark-divider`) still exist in `globals.css` but as of 2026-07-31 no page hero uses them — Advertisers/Investors/Nova hero sections are all light (`#FAFAF7`)

### Typography
- Headings: Lora (serif), `font-serif`
- Body: Inter (sans), `font-sans`
- Sizes via `clamp()` for responsive scale
- NO emojis anywhere — premium product

### Layout patterns
- `max-w-content mx-auto` — max 1120px centered
- `container-pad` — responsive horizontal padding
- `section-pad` — responsive vertical padding
- Gap-px grid with `background: var(--divider)` — borderless grid cells

## Locale Keys Structure
All web-site-specific namespaces in `locales/en.json`:
- `nav.*` — navigation labels
- `footer.*` — footer labels and links
- `home.*` — home page
- `forUsers.*` — For Users page
- `forCreators.*` — For Creators page
- `advertisers.*` — Advertisers page
- `novaPage.*` — Nova page
- `nsvxPage.*` — NSVX page
- `investors.*` — Investors page (rebuilt 2026-07-31 — 12 narrative sections + "Built Since 2025" + Roadmap + contact form, see Incident Log)
- `ambassador.*` — Ambassador Program page
- `pressPage.*` — Press page
- `blog.*` — Blog UI labels
- `howNsvx.*` — legacy How NSVX Works page
- `forListeners.*` — legacy For Listeners page
- `pricing.*` — Pricing page
- `legalHub.*` — Legal hub and pages
- `legal*.*` — Individual legal pages

## Scripts
- `scripts/update-en-keys.mjs` — adds new English keys to en.json
- `scripts/translate-new-keys.mjs` — auto-translates missing keys for 9 locales via Claude Haiku
- `scripts/update-locales.py` — legacy (used for the initial 5-key positioning update)

## Dependencies
- `gray-matter` — blog post frontmatter parsing
- `marked` — markdown to HTML for blog posts
- `next@14.2.35`, `react@18`, TypeScript, Tailwind CSS 3

## SEO
- Root layout (`app/layout.tsx`): global title template + meta description + `openGraph`/`twitter` defaults (see below)
- Locale layout (`app/[locale]/layout.tsx`): hreflang alternates for all 10 locales, plus its own `openGraph`/`twitter` (with the per-locale canonical `url`) via `generateMetadata`
- Per-page metadata: add `generateMetadata` to each page TSX as needed
- **`utils/seo.ts`** — single source of truth for `SITE_NAME`, `BASE_URL`, `DEFAULT_TITLE`, `DEFAULT_DESCRIPTION`, `OG_IMAGE` (1200×630, `public/og-image.png`), and the `buildOpenGraph(url)` / `buildTwitter()` helpers. **Important Next.js quirk:** nested metadata objects like `openGraph`/`twitter` are REPLACED, not deep-merged, when a child layout/page defines its own — so any segment that sets `openGraph` must build the *complete* object (title/description/siteName/type/images), not just the field it wants to change. That's why the locale layout re-declares the full `openGraph` object via `buildOpenGraph(canonicalUrl)` rather than trying to override just `url`.
- `public/og-image.png` — the branded 1200×630 social/iMessage preview image (AlphaGlow AI logo on a dark background with a terracotta glow). Regenerate via `python scripts/generate-og-image.py` (requires Pillow) if the logo or brand palette ever changes — do not hand-edit the PNG.
- `og:image`/`og:url`/`twitter:image` are always absolute production URLs (`https://alphaglowai.com/...`), by design, even when the page is served from the staging domain — this is correct OG/canonical practice, but it means a staging-URL iMessage/link-preview tap-test can show a broken image until the referenced file actually exists on `main` (production).

## Incident Log

### 2026-07-31 — Open Graph and Twitter Card metadata added (fixes broken iMessage/social link previews)
Petr reported the alphaglowai.com iMessage/social link preview showed no logo — just the raw page title and a generic placeholder. Diagnosed first (no changes) before fixing:
- **Root cause:** `app/layout.tsx`'s `metadata` export had no `openGraph` or `twitter` key at all — confirmed via live HTML fetch that zero `og:`/`twitter:` meta tags existed anywhere on the site, on any page or locale. No dedicated OG image asset existed either (only the 512×512 square app-icon logo, below the 1200×630 recommended minimum).
- **Fix:** added `utils/seo.ts` as a shared source of truth (see "SEO" above), wired `openGraph`/`twitter` into both `app/layout.tsx` and `app/[locale]/layout.tsx` (the latter with the correct per-locale canonical `url`), and generated `public/og-image.png` (1200×630) via `scripts/generate-og-image.py` — the AlphaGlow AI Flower of Life logo composited on a dark on-brand background with a terracotta glow, wordmark, and tagline.
- **Verified live on production** (commit `202d7ce`, merged `staging` → `main`): all of `og:title`, `og:description`, `og:url`, `og:site_name`, `og:image` (+ `width`/`height`/`alt`), `og:type`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` present and correct on `https://alphaglowai.com/en/`. `og:image` URL (`https://alphaglowai.com/og-image.png`) confirmed 200 OK, `image/png`, and the downloaded bytes independently verified as exactly 1200×630 (not just trusting the HTTP header). `og:url` spot-checked on `/cs/`, `/de/`, `/fr/` and confirmed to correctly resolve to each locale's own canonical path.
- Branch `feat/og-social-preview-image` → merged to `staging` → tap-tested → merged to `main` on Petr's explicit authorization.

### 2026-07-31 — Terracotta color sweep, NSVR removal, brand-name sweep, Ambassador economics fix, nav reorg, full Investors page rebuild — all merged to main
Large multi-part session, all items verified live on staging before merging to `main` (commit `f64f7c0`, merged from `staging`):
- **Color consistency:** every remaining `--nova-teal`/`--gold`/`--amber` usage (Advertisers CTA + stat numbers, Investors badge + tokenomics stat, NSVX badge + Solana callout, How NSVX Works spend value, For Users feature border) converted to `--terracotta`. Dead CSS vars and the Tailwind `amber` color removed. See "Colors" above.
- **Tipping content removed:** For Creators payout copy said "...tipping after a journey..." as an NSVX spend example — not a real feature. Replaced with "licensing your music" across all 10 locales.
- **NSVR fully removed from public content:** the Investors page roadmap's 2027 entry directly named "NSVR", "NeuroScope VR", "spatial computing", and "AlphaGlow AI becomes the identity layer for the metaverse" — all confirmed as the only public NSVR reference sitewide (NSVR is meant to stay unnamed publicly per standing decision). Replaced with the approved "Villages and the AG Games" roadmap entry across all 10 locales.
- **"AlphaGlow AI" brand-name sweep:** 632 instances of bare "AlphaGlow" (not followed by "AI") corrected to "AlphaGlow AI" across all 10 locale files plus hardcoded strings in `signup/page.tsx` and the Ambassador page's meta description. One JSX code comment intentionally left untouched (never rendered to users). `ambassador.investorBody`'s bare "AlphaGlow?" mention was deliberately left as-is per the standing instruction that the investor-referral section of the Ambassador page stays completely untouched.
- **Ambassador page commission economics corrected:** creator/advertiser referral commissions are 10% of the referred party's **gross revenue** (not AlphaGlow's platform fee), paid as an **NSVX equivalent**, for **12 months from the date of the referral** — not indefinitely, no flat $10 onboarding bonus. The "what 10% commission means" example now uses a realistic $200/month case. Investor referral section (personal, discretionary, no formula) is untouched by design.
- **Nav reorganized:** added Investors and Press links (previously missing from the hamburger/desktop nav entirely) — see "Components" above.
- **Investors page fully rebuilt:** replaced the old Vision/Mission, Tokenomics/allocation, Team (bio), Whitepaper/Press-kit, and Referrals sections with 12 new narrative sections (Why This Works Differently, Meet Nova, Nova Whisper, Nova Local, Privacy Commerce [flagged as planned 2027, not live], Proof of Attention, One Currency One Economy, Proof of Vote, Patent Pending Technology, Governance Built to Last, A Fee Structure Built to Last, and "Built Since 2025, Not Overnight"), new hero headline/subline. Roadmap section and the investor-enquiry contact form deliberately left untouched. The 2027 Villages/AG Games roadmap entry got an appended explainer (seasons, category vs. Grand Championship, Proof of Vote mechanics) — appended, not replacing the original text.
- **Pre-existing bug also fixed by this merge (was already fixed on `staging` earlier this session, just never reached `main` before now):** the For Creators page's six-example cards and closing "Building something else?" invite were rendering raw i18n keys (`forCreators.example1Headline` etc.) instead of content — this was the specific defect Petr saw live on production before the merge. Confirmed fixed and verified live post-deploy.
- **Full site audit before the main merge:** static-export scan across all 263 pages × 10 locales × 23 content namespaces confirmed zero raw i18n key leaks anywhere on the site, plus manual verification of For Creators (content + mobile card stacking) and the homepage nav.
- All content changes applied across all 10 locales throughout.

### 2026-06-01 — Netlify GitHub Connection Lost and Restored
- **What happened:** Netlify lost GitHub SSH access to NovaNSVR/agai-web. All branch-triggered deploys failed with `Host key verification failed`. Build settings showed `installation_id: null` and `deploy_key_id: null`.
- **Resolution:** Petr reconnected the GitHub integration via the Netlify dashboard (Site settings → Build & deploy → Link repository). Production deployed successfully at 20:45 local time.
- **Staging deploy workflow:** Confirmed working post-reconnection. Staging branch auto-deploys via GitHub webhook. URL: `https://staging--agai-web.netlify.app`

### 2026-06-01 — Privacy Policy Page Live
- **URL:** `https://alphaglowai.com/en/privacy` (also accessible at `/privacy` via middleware locale redirect)
- **Covers 12 sections:** Introduction (NeuroScope Technologies LLC, 4055 Westminster Dr, Sarasota FL 34241), Data Collected (name, email, device info, usage data, NSVX wallet address), How We Use It (platform ops, Nova AI personalization, NSVX token rewards, creator analytics), Nova AI Data, Third-Party Services (Supabase, Crossmint, ElevenLabs, Moonpay, Solana blockchain, Anthropic), Data Retention, User Rights (access/correction/deletion, contact: admin@alphaglowai.com), Cookies & Analytics, Children Under 13 (prohibited), Push Notifications, Policy Changes, Contact.
- **App Store compliance:** Page covers all required privacy disclosures for iOS App Store submission.
- **Contact:** admin@alphaglowai.com | NeuroScope Technologies LLC

## Git / Deploy Flow
1. Make changes in `C:\ai-tools\agai-web`, on a branch off freshly-pulled `staging`
2. Run `npm run build` — must pass with zero errors
3. Verify visually (Playwright/browser at 390px) on every changed page
4. Commit with descriptive message, merge `--no-ff` into `staging`, push `staging` (Claudia can push to staging without asking — confirmed standing permission)
5. Verify live on `staging--agai-web.netlify.app`
6. Only on Petr's explicit "push" (to main): merge `staging` into `main`, push `main`, verify live on `alphaglowai.com`, then update this file per the Toolchain Rules item above
