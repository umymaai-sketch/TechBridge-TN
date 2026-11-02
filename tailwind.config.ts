import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: { navy: { 950: "#071426", 900: "#0B1D35", 800: "#102A4C", 700: "#163B63" }, aqua: "#56D7E5" },
    boxShadow: { glow: "0 0 50px rgba(86,215,229,.13)" },
    backgroundImage: { "navy-gradient": "linear-gradient(135deg,#071426 0%,#102A4C 55%,#16476B 100%)" }
  }},
  plugins: []
};
export default config;
