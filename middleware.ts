import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "cs", "sk", "es", "de", "fr", "pt", "it", "pl", "nl"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

const DEFAULT_LOCALE: Locale = "en";

// Parse Accept-Language header → best match locale
function detectLocale(request: NextRequest): Locale {
  // 1. Cookie preference takes highest priority
  const cookie = request.cookies.get("ag-locale")?.value;
  if (cookie && SUPPORTED_LOCALES.includes(cookie as Locale)) return cookie as Locale;

  // 2. Accept-Language header
  const accept = request.headers.get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const code = part.trim().split(";")[0].toLowerCase().split("-")[0];
    if (SUPPORTED_LOCALES.includes(code as Locale)) return code as Locale;
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through Next.js internals and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(ico|png|jpg|jpeg|webp|svg|woff2?|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a supported locale segment
  const firstSegment = pathname.split("/")[1];
  const hasLocalePrefix = SUPPORTED_LOCALES.includes(firstSegment as Locale);

  // Root or non-locale-prefixed path → redirect to /{locale}/
  if (!hasLocalePrefix) {
    const locale = detectLocale(request);
    const target = `/${locale}${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.redirect(new URL(target, request.url));
    return response;
  }

  // Already locale-prefixed — pass through, injecting pathname header for hreflang
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
