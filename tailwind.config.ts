import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        muted: "var(--muted)",
        border: "var(--border)",
        signal: "var(--signal)",
        "signal-dark": "var(--signal-dark)",
        "signal-soft": "var(--signal-soft)",
        positive: "var(--positive)",
        "positive-soft": "var(--positive-soft)",
        negative: "var(--negative)",
        "negative-soft": "var(--negative-soft)",
        amber: "var(--amber)",
        "amber-soft": "var(--amber-soft)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
    },
  },
  plugins: [],
};
export default config;
