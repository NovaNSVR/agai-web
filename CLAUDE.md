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
- Git push to main → Netlify auto-deploys (GitHub integration required — link in Netlify dashboard)
- Build command: `npm run build`
- Publish dir: `out`
- Netlify auth token (env): `nfc_jeF9Yyi3fJHaiyc1SgDzyY3dvdkhTX16f3c0`

## Toolchain Rules (non-negotiable)
1. **Playwright at 390px** — verify every new page visually before any push
2. **code-review-graph** — run detect_changes + get_review_context on diff before committing
3. **frontend-design skill** — use for any visual/UI decisions
4. **NEVER push without Petr's explicit "push" approval**
5. **npm run build must pass** — zero errors before any commit
6. **Batch all changes** — one commit per feature, never incremental pushes

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
| `/[locale]/investors/` | `app/[locale]/investors/page.tsx` | Live (2026-05-20) |
| `/[locale]/press/` | `app/[locale]/press/page.tsx` | Live (2026-05-20) |
| `/[locale]/blog/` | `app/[locale]/blog/page.tsx` | Live (2026-05-20) |
| `/[locale]/blog/[slug]/` | `app/[locale]/blog/[slug]/page.tsx` | Live (2026-05-20) |
| `/[locale]/pricing/` | `app/[locale]/pricing/page.tsx` | Live |
| `/[locale]/how-nsvx-works/` | `app/[locale]/how-nsvx-works/page.tsx` | Legacy (kept) |
| `/[locale]/for-listeners/` | `app/[locale]/for-listeners/page.tsx` | Legacy (kept) |
| `/[locale]/legal/...` | `app/[locale]/legal/` | Live |

## Components

| File | Purpose |
|------|---------|
| `components/Nav.tsx` | Sticky top nav — 6 primary links (For Users, For Creators, Advertisers, Nova, NSVX, Pricing) |
| `components/Footer.tsx` | 5-column footer (Brand, Platform, Company, Legal, Get Started) |
| `components/FAQ.tsx` | Accordion FAQ — takes `items: {q, a}[]` |
| `components/ContactForm.tsx` | Netlify Forms wrapper — takes fields + formName |
| `components/LanguageSwitcher.tsx` | Locale dropdown |
| `components/LegalLayout.tsx` | Wrapper for legal prose pages |

## Design System

### Light sections (default)
- `--bg: #FAFAF7` (cream page background)
- `--surface: #FFFFFF` (card/box background)
- `--ink: #1A1A1A`, `--muted: #5C5C5A`, `--divider: #E8E6E0`
- `--terracotta: #D88B5C` (primary CTA, badges)
- `--amber: #C9A84C` = `--gold: #C9A84C` (NSVX accent)
- `--moss: #3F7A5C` (positive/earn values)

### Dark sections
- `--dark-bg: #060F0F` (hero backgrounds for Advertisers, Investors, Nova)
- `--dark-ink: #F5F5F2`, `--dark-muted`, `--dark-divider`
- `--nova-teal: #00B4B4` (Nova brand accent, teal CTAs on dark)
- Apply via inline `background: "var(--dark-bg)"` — no Tailwind dark class

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
- `investors.*` — Investors page
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
- Root layout (`app/layout.tsx`): global title template + meta description
- Locale layout (`app/[locale]/layout.tsx`): hreflang alternates for all 10 locales
- Per-page metadata: add `generateMetadata` to each page TSX as needed

## Git / Deploy Flow
1. Make changes in `C:\ai-tools\agai-web`
2. Run `npm run build` — must pass with zero errors
3. Run Playwright at 390px on every changed page
4. Commit with descriptive message
5. Petr says "push" → push to origin main → Netlify auto-deploys
