import { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'

import App from '@components/App'

import './globals.css'

// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		template: 'PURPLESHOP | %s',
		default: 'PURPLESHOP'
	},
	generator: 'Next.js',
	applicationName: 'PURPLESHOP',
	referrer: 'origin-when-cross-origin',
	keywords: ['Next.js', 'React', 'TypeScript'],
	authors: [{ name: 'PURPLE77777', url: 'https://github.com/PURPLE77777' }],
	colorScheme: 'dark',
	creator: 'PURPLE77777',
	publisher: 'PURPLE77777',
	formatDetection: {
		email: false,
		address: false,
		telephone: false
	}
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang='en'>
			<body>
				<App>{children}</App>
			</body>
		</html>
	)
}

export default RootLayout
