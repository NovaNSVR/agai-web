"use client";

import { useEffect } from "react";

// Static export fallback — middleware doesn't run.
// Netlify _redirects handles / → /en/ at the CDN level.
// This client-side fallback covers direct static serving.
export default function RootPage() {
  useEffect(() => {
    window.location.replace("/en/");
  }, []);
  return null;
}
