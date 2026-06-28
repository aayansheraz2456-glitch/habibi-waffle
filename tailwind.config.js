/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Instrument Serif'", "serif"],
        body: ["'Barlow'", "sans-serif"],
        brand: ["'Pacifico'", "cursive"],
      },
      colors: {
        habibi: {
          purple: "#4a1d6e",
          "purple-dark": "#260f3d",
          plum: "#3d1a5c",
          pink: "#e6398b",
          magenta: "#ff3d9a",
          gold: "#f5a623",
          orange: "#f7941d",
          wine: "#4a0e16",
          "wine-dark": "#2a060c",
          charcoal: "#1a1b1f",
          cream: "#f3e6c4",
        },
      },
      keyframes: {
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 24s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
