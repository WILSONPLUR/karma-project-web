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
				inter: ['Inter', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				unbounded: ['Unbounded', 'sans-serif'],
				wallpoet: ['Wallpoet', 'sans-serif'],
			},
		},
		fontFamily: {
			sans: ['Montserrat', 'sans-serif'],
		},
	},
	plugins: [],
};