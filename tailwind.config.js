/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        sansita: ["Sansita Swashed", "cursive"],
      },
      width: {
        120: "30rem",
      },
      colors: {
        danger: "#F31260", 
      },
      
    },
    
  },

  darkMode:"class",
  plugins: [require("@nextui-org/react")],
  plugins: [require("tailwind-scrollbar-hide")],
};
