const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Jost", ...defaultTheme.fontFamily.sans],
      serif: [...defaultTheme.fontFamily.serif],
      mono: [...defaultTheme.fontFamily.mono],
      brand: ["Satisfy", "cursive"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "20rem",
      },
    },
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#AD1FEA",
          "primary-content": "#FFFFFF",
          secondary: "#373F68",
          "secondary-content": "#FFFFFF",
          accent: "#4661E6",
          "accent-content": "#FFFFFF",
          neutral: "#3D4451",
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",
          error: "#D73737",
          "error-content": "#FFFFFF",
        },
      },
    ],
  },
};
