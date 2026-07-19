import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0C",
        panel: "#111114",
        slate: "#1A1A1E",
        line: "#28282E",
        technical: "#4AB8FF",
        electric: "#5CE1E6",
      },
      boxShadow: {
        glow: "0 0 80px rgba(74, 184, 255, 0.10)",
      },
      letterSpacing: {
        technical: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
