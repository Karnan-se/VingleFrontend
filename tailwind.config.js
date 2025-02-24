/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        120: "30rem",
      },
      colors: {
        danger: "#F31260", // Configure only the danger color
      },
      
    },
    
  },

  darkMode:"class",
  plugins: [require("@nextui-org/react")],
  plugins: [require("tailwind-scrollbar-hide")],
};
