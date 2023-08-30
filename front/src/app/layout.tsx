import { Metadata } from 'next'

import './globals.css'
import Main from '@/components/main/Main'

// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		template: 'PURPLESHOP | %s',
		default: 'PURPLESHOP'
	},
	generator: 'Next.js',
	applicationName: 'PURPLESHOP',
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

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<Main />
			</body>
		</html>
	)
}
