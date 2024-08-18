/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["bumblebee", "dracula"]
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui'),
  ],
}