/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        120:"30rem"
      }
    },
  },
  plugins: [require("@nextui-org/react")],
}