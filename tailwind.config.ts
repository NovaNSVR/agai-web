import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAF7",
        surface: "#FFFFFF",
        ink: "#1A1A1A",
        muted: "#5C5C5A",
        divider: "#E8E6E0",
        terracotta: "#D88B5C",
        moss: "#3F7A5C",
        brick: "#B0463A",
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1120px",
        prose: "680px",
      },
    },
  },
  plugins: [],
};

export default config;
