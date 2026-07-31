import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";
import { BASE_URL, DEFAULT_TITLE, DEFAULT_DESCRIPTION, buildOpenGraph, buildTwitter } from "@/utils/seo";

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | AlphaGlow AI",
  },
  description: DEFAULT_DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: buildOpenGraph(BASE_URL),
  twitter: buildTwitter(),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${lora.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg text-ink">{children}</body>
    </html>
  );
}
