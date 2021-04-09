module.exports = {
  purge: ["./src/**/*.js", "./docs/**/*.js"],
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
  variants: {
    extend: {
      backgroundColor: ["odd"],
      backgroundOpacity: ["odd"],
    },
  },

  theme: {
    fontFamily: {
      sans: ["Lato", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          50: "#fdf9f8",
          100: "#fdeef3",
          200: "#fbcee6",
          300: "#fba4d1",
          400: "#fc6bad",
          500: "#fc4086",
          600: "#f7274a",
          700: "#df1d4c",
          800: "#b4183c",
          900: "#901530",
        },
        gray: {
          50: "rgb(247, 247, 247)",
          100: "#f3f2f0",
          200: "#e7e4e0",
          300: "#d7cfc9",
          400: "#bbaca4",
          500: "#9c857d",
          600: "#7d615f",
          700: "#634b50",
          800: "#4e3b43",
          900: "#3e3037",
        },
      },
    },
  },
}
