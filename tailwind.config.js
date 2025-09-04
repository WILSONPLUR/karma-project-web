/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./site/layouts/**/*.html",
    "./site/layouts/**/*.htm",
    "./site/content/**/*.{html,md}",
    "./site/data/**/*.{json,yaml,yml}",
    "./src/**/*.{js,ts,css,scss}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        unbounded: ["Unbounded", "sans-serif"],
        wallpoet: ["Wallpoet", "sans-serif"],
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};
