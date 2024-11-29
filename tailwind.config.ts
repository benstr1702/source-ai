import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				wsj: {
					DEFAULT: "#1B1B1B", // WSJ black
					accent: "#00008B", // WSJ blue
				},
				nyt: {
					DEFAULT: "#000000", // NYT black
					accent: "#567B95", // NYT blue
				},
				aljazeera: {
					DEFAULT: "#FDB813", // Al Jazeera yellow
					accent: "#FFCD00", // Al Jazeera gold
				},
				bbc: {
					DEFAULT: "#000000", // BBC black
					accent: "#BB1919", // BBC red
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
