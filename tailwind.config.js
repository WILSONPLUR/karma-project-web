/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./site/layouts/**/*.html",
    "./site/content/**/*.{html,md}",
    "./src/**/*.{js,ts,css,scss}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "unbounded": ["Unbounded", "sans-serif"],
        "montserrat": ["Montserrat", "sans-serif"],
      },
      colors: {
        "karma-red": "#dc2626",
        "karma-black": "#1f2937",
      },
      screens: {
        "sm": "560px",
        "md": "800px",
        "lg": "960px",
        "xl": "1240px",
      },
    },
  },
  plugins: [],
};