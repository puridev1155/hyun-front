const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }
      'md': '860px',
      // => @media (min-width: 960px) { ... }
      'lg': '1200px',
      // => @media (min-width: 1440px) { ... }
      'xl': '1440px'
    }
  },
  plugins: [],
}