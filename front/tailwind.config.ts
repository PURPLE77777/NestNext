import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		colors: {
			lightDark: '#192028',
			primOrange: '#EE9515',
			primBlue: '#4965A2',
			primYellow: '#FBD867'
		}
	},
	plugins: []
}
export default config
