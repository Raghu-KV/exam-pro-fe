/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        appGreen: "#287F71",
        appOrange: "#EB862A",
        appLightGray: "#ABBDD3",
        appGray: "#97A3B6",
        appDarkBlue: "#111729",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
