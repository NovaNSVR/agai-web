import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://alphaglowai.com"),
  title: {
    default: "AlphaGlow AI — The Creator Economy Platform",
    template: "%s | AlphaGlow AI",
  },
  description:
    "AlphaGlow AI is the creator economy platform where creators publish AI-powered sessions, build a Digital Twin with Nova, and earn NSVX when their audience grows.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${lora.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg text-ink">{children}</body>
    </html>
  );
}
