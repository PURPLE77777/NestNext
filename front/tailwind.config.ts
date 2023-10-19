import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		colors: {
			lightDark: '#161d25',
			primOrange: '#ff9900',
			primBlue: '#4965A2',
			primYellow: '#FBD867'
		}
	},
	plugins: []
}
export default config
