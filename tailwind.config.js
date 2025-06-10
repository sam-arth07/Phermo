/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#f0f4ff",
					100: "#e0eaff",
					200: "#c7d7fe",
					300: "#a5b8fc",
					400: "#8b90f8",
					500: "#7c6ef2",
					600: "#6d4ee6",
					700: "#5e3fcb",
					800: "#4d32a3",
					900: "#412d82",
				},
				purple: {
					50: "#faf5ff",
					100: "#f3e8ff",
					200: "#e9d5ff",
					300: "#d8b4fe",
					400: "#c084fc",
					500: "#a855f7",
					600: "#9333ea",
					700: "#7c3aed",
					800: "#6b21a8",
					900: "#581c87",
				},
			},
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui"],
			},
			boxShadow: {
				soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
				medium: "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)",
			},
		},
	},
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
