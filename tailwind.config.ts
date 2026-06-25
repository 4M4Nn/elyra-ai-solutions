import type { Config } from "tailwindcss"
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050B12", "bg-alt": "#080F18",
        cyan: "#00D4C8", "cyan-light": "#00F0E3",
        purple: "#7B4FFF", "purple-light": "#9D7BFF",
        teal: "#0EA5A0", "off-white": "#E8F4F4",
        "text-muted": "#4A6070",
      },
      fontFamily: {
        space: ["var(--font-space)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config
