module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        white_A700_7f: "#ffffff7f",
        white_A700_b2: "#ffffffb2",
        gray_400: "#b8b8b8",
        gray_500: "#999999",
        blue_gray_100: "#cccccc",
        blue_gray_100_cc: "#d6d6d6cc",
        black_900_3f: "#0000003f",
        gray_300: "#e6e6e6",
        white_A700_99: "#ffffff99",
        white_A700_dd: "#ffffffdd",
        gray_500_01: "#a4a3a3",
        white_A700_89: "#ffffff89",
        white_A700_19: "#ffffff19",
        black_900_19: "#00000019",
        white_A700: "#ffffff",
      },
      boxShadow: {
        bs1: "0px 4px  4px 0px #0000003f",
        bs: "0px 5px  20px 0px #00000019",
      },
      fontFamily: { rubik: "Rubik", roboto: "Roboto", raleway: "Raleway" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
