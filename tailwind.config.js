/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette (per project spec)
        primary: {
          DEFAULT: "#0F172A", // deep navy
          50: "#f1f5f9",
          100: "#e2e8f0",
          600: "#1e293b",
          700: "#172033",
          900: "#0F172A",
        },
        secondary: {
          DEFAULT: "#0EA5A4", // teal
          light: "#2dd4d3",
          dark: "#0b7d7c",
        },
        accent: {
          DEFAULT: "#F59E0B", // amber
          light: "#fbbf24",
          dark: "#b45309",
        },
        sand: {
          DEFAULT: "#FBF9F8",
          100: "#f6f3f2",
          200: "#f0eded",
          300: "#e4e2e1",
        },
        ink: "#1b1c1c",
        muted: "#434651",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Montserrat"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.06)",
        lift: "0 18px 50px rgba(15, 23, 42, 0.12)",
        glow: "0 8px 24px rgba(14, 165, 164, 0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "kenburns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "kenburns": "kenburns 18s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
