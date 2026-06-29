/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f4ead7",
        "cream-deep": "#ead7b8",
        ivory: "#fffaf0",
        silver: "#ebe7df",
        gold: "#b9862f",
        "gold-bright": "#d7aa55",
        crimson: "#8e1f25",
        "crimson-deep": "#5f1419",
        ink: "#201714",
        "ink-soft": "#4b3a32",
      },
      fontFamily: {
        serifTitle: ["Cinzel", "Georgia", "serif"],
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "Arial", "sans-serif"],
      },
      boxShadow: {
        royal: "0 18px 40px rgba(32, 23, 20, 0.1)",
        "royal-deep": "0 22px 58px rgba(32, 23, 20, 0.18)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 560ms ease forwards",
      },
    },
  },
  plugins: [],
};
