/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "var(--white)",
        offwhite: "var(--off-white)",
        black: "var(--black)",
        main: "var(--light-blue)",
        accent: "var(--dark-blue)",
        secondary: "var(--yellow)",
        red: "var(--red)",
        teal: "var(--teal)",
        lilac: "var(--lilac)",
        greenbud: "var(--green-bud)",
        green: "var(--dark-green)",
      },
    },
  },
  plugins: [],
};
