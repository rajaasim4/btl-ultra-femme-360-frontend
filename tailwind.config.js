/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        themeBlue: "#253E90",
        themeStepperGrey: "#C3C0C0",
        themeBackBtnGrey: "#BFBFBF",
      },
      fontSize: {
        "2.5xl": "1.625rem",
        "5.5xl": "3.44rem",
        "4.5xl": "2.5rem",
      },
      screens: {
        "xsm": "440px"
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
