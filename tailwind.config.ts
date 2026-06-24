import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { background: "#050816", accent: "#00D4FF", secondary: "#6E44FF", teal: "#00FFB2", subtext: "#8892B0" },
      fontFamily: { grotesk: ["var(--font-grotesk)"], inter: ["var(--font-inter)"] },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
