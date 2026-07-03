import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tejas: {
          saffron: {
            DEFAULT: "#E85D04",
            soft: "#FFF4ED",
            dark: "#C2410C",
          },
          blue: {
            DEFAULT: "#1E3A5F",
            dark: "#0F172A",
          },
          ivory: "#FAF9F6",
          emerald: "#059669",
          gold: "#D4A017",
          ink: "#1C1917",
          muted: "#57534E",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        hindi: ["var(--font-noto-devanagari)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        tejas: "0 12px 40px rgba(30, 58, 95, 0.08)",
        "tejas-lg": "0 20px 60px rgba(30, 58, 95, 0.12)",
      },
      backgroundImage: {
        "mandala-accent":
          "radial-gradient(circle at 20% 20%, rgba(232, 93, 4, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(30, 58, 95, 0.06) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
