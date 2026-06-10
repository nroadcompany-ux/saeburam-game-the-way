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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // THE WAY brand colors
        way: {
          gold: "#C9A84C",
          "gold-light": "#E8C97A",
          "gold-dark": "#9C7B30",
          navy: "#1A2B4A",
          "navy-light": "#2A3F6B",
          "navy-dark": "#0D1829",
          parchment: "#F5EDD6",
          "parchment-dark": "#E8D9B0",
          crimson: "#8B1A1A",
          olive: "#4A6741",
        },
        // Emotion Selection UI colors
        'dark-navy': '#1A1F3A',
        'cream': '#F5F1E8',
        'gold': '#D4AF37',
        'dark-red': '#2A1F1F',
        'dark-blue': '#1A2847',
        'emotion-purple': '#1F2340',
        'sub-text': '#D4C8B8',
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      backgroundImage: {
        "way-gradient": "linear-gradient(135deg, #1A2B4A 0%, #0D1829 100%)",
        "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #9C7B30 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
