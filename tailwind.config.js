/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class", // 👈 Enables Dark Mode using "class"
	content: [
		"./src/**/*.{js,ts,jsx,tsx}", // ✅ Scan all files inside src/ folder
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
