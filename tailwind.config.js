
import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */

// TODO themes and overrides ans applying default colors to bg and fg

module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui({
    // prefix: "heroui",
    // addCommonColors: false,
    light: {
      colors: {
        default: "#007AFF",
      }
    },
    dark: {
      colors: {
        default: "#007AFF",
      }
    },
  })],
};