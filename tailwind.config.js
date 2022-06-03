const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    fontFamily: {
      rubik: ["Rubik"],
    },
    extend: {
      colors: {
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
        },
        gray: {
          primary: "#31315E",
          secondary: "#484870",
          light: "#A3A3B7",
        },
      },
      boxShadow: {
        orange: "5px 5px 0 rgba(255, 148, 77, 0.5)",
        "orange-lg": "13px 13px 0 rgba(255, 148, 77, 0.5)",
        "dark-sharp": "13px 13px 0 rgba(11, 0, 0, 0.25)",
        "purple-active": "10px 10px 30px rgba(135, 72, 239, 0.15)",
      },
    },
  },
  variants: {
    extend: {},
  },
};
