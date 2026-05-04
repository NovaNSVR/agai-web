# AlphaGlow AI — Marketing Site (alphaglowai.com)

## Project Placement Decision

**Folder:** `C:\ai-tools\agai-web`
**Domain target:** alphaglowai.com

### Why a separate project (not a monorepo with NEW-AGAI-Base)

This site is a standalone Next.js project, not a route group inside the existing `NEW-AGAI-Base` (alphaglowai.app) codebase. Reasons:

1. **Separate deployment targets.** The `.app` is a Netlify PWA with service worker, push notifications, and Supabase SSR auth. The `.com` is a public marketing surface with no auth and different caching requirements. Shared infrastructure would require routing gymnastics that add risk for zero benefit at Phase 1.

2. **Different auth model at Phase 2.** When .com gets auth (NSVX purchase flow, MoonPay), the decision of whether to share Supabase with .app or use a separate project should be made with that requirement in hand — not pre-decided in the scaffolding. Separate repos make this transition explicit rather than hidden.

3. **Independent release cadence.** Marketing copy and legal pages change independently of app logic. A separate repo means a marketing update never blocks or is blocked by an app deploy.

4. **Folder name rationale.** `agai-web` used instead of `alphaglowai-com` because: (a) the `alphaglowai-com` folder already existed with an old coming-soon HTML page and conflicting files, and (b) npm naming restrictions block capitals, preventing `NEW-AGAI-Web`. The folder is a development convenience — the Netlify site is what defines the domain.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Google Fonts: Lora (editorial serif) + Inter (humanist sans)

## Design System

| Token | Value |
|-------|-------|
| bg | `#FAFAF7` |
| surface | `#FFFFFF` |
| ink | `#1A1A1A` |
| muted | `#5C5C5A` |
| divider | `#E8E6E0` |
| terracotta | `#D88B5C` (CTAs) |
| moss | `#3F7A5C` (positive) |
| brick | `#B0463A` (negative) |
| amber | `#C9A84C` (NSVX) |

No shadows, no parallax, no animations, no AI shimmer, no glow, no purple/cyan.

## Locales

10 launch locales: **en, cs, sk, de, es, fr, pt, nl, pl, it** — matching the alphaglowai.app architecture.

- URL-based routing: `/{locale}/path` (e.g. `/de/for-creators`)
- First-visit language detection from `Accept-Language` header via middleware
- Cookie-based persistence (`ag-locale`, 1-year), overrides auto-detection on return visits
- Minimalist language switcher dropdown in nav (globe icon + locale code)
- hreflang alternates on every page for all 10 locales + `x-default`
- 418 translation keys per locale, full parity verified across all 10 files
- Brand terms never translated: AlphaGlow, NSVX, Nova, Digital Twin, Nova Studio
- Nova always feminine in all gendered languages (Rule A)
- Unknown-gender user: masculine in Slavic languages cs/sk/pl, neutral elsewhere (Rule B)

**Legal translations:** Machine-translated; must be reviewed by qualified legal counsel in each jurisdiction before production use.

## Routes

All routes are prefixed with `/{locale}/`. Example: `/de/for-creators`.

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/{detected-locale}` |
| `/{locale}` | Homepage — hero, creator archetypes, NSVX 3-step, comparison block |
| `/{locale}/for-creators` | Creator value prop, how it works, CTA to apply |
| `/{locale}/for-listeners` | Listener value prop, how it works, CTA to start free |
| `/{locale}/how-nsvx-works` | NSVX earn/spend tables, creator flow, FAQ |
| `/{locale}/pricing` | 3-tier pricing (Starter/Core/Creator) |
| `/{locale}/legal` | Legal hub with sidebar TOC |
| `/{locale}/legal/terms` | Terms of Service |
| `/{locale}/legal/privacy` | Privacy Policy |
| `/{locale}/legal/ai-disclaimer` | AI Disclaimer |
| `/{locale}/legal/health-disclaimer` | Health Disclaimer |
| `/{locale}/legal/creator-agreement` | Creator Agreement |
| `/{locale}/legal/nsvx-disclaimer` | NSVX Disclaimer |

## Commands

```bash
npm run dev      # development server at localhost:3000
npm run build    # production build
npm run start    # production server
```

## Phase 2 notes (for future reference)

When adding auth/NSVX purchase flow:
- Evaluate whether to share Supabase project with NEW-AGAI-Base or create a separate project
- If shared: add NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY to Netlify env
- MoonPay integration goes in a new `/buy-nsvx` route
- Do not add auth to Phase 1 routes — keep the marketing surface clean and fast
