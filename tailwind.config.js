const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      rubik: ["Rubik"],
    },
    extend: {
      fontSize: {
        "3.5xl": [
          "32px",
          {
            lineHeight: "41px",
          },
        ],
        "5.5xl": [
          "57px",
          {
            lineHeight: "60px",
          },
        ],
      },
      screens: {
        xs: { max: "475px" },
        "1.5xl": "1380px",
        "3xl": "1600px",
        ...defaultTheme.screens,
      },
      colors: {
        whiteAlpha: {
          900: "rgba(255,255,255,0.9)",
          800: "rgba(255,255,255,0.8)",
          700: "rgba(255,255,255,0.7)",
          600: "rgba(255,255,255,0.6)",
          500: "rgba(255,255,255,0.5)",
          400: "rgba(255,255,255,0.4)",
          300: "rgba(255,255,255,0.3)",
          200: "rgba(255,255,255,0.2)",
          100: "rgba(255,255,255,0.1)",
          50: "rgba(255,255,255,0.05)",
        },
        green: {
          team: "#6DBD60",
        },
        red: {
          team: "#F94343",
        },
        orange: {
          team: "#FF9F5E",
        },
        purple: {
          ...colors.purple,
          primary: "#7D50E6",
          hover: "#9773EB",
          secondary: "#8A62E9",
          dark: "#372B79",
          darker: "#15153D",
          darkest: "#181834",
          customBg: "#1A1A4C",
          stakeBg: "#1F0B25",
        },
        gray: {
          team: "#9A9AA8",
          primary: "#31315E",
          secondary: "#484870",
          light: "#A3A3B7",
          dark: "#767694",
          darker: "#5F5F82",
        },
      },
      boxShadow: {
        green:
          "10px 10px 50px 6px rgba(109, 190, 96, 0.25), 13px 13px 0px rgba(11, 0, 0, 0.25)",
        red: "10px 10px 50px 6px rgb(249 67 67 / 20%), 13px 13px 0px rgba(11, 0, 0, 0.25)",
        orange:
          "10px 10px 50px 6px rgb(255 159 94 / 25%), 13px 13px 0px rgba(11, 0, 0, 0.25)",
        gray: "10px 10px 50px 6px rgb(154 154 168 / 20%), 13px 13px 0px rgba(11, 0, 0, 0.25)",
        dark: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        "dark-sharp": "13px 13px 0px rgba(11, 0, 0, 0.25)",
        "purple-active": "10px 10px 30px rgba(135, 72, 239, 0.15)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
