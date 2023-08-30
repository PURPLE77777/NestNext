import { Metadata } from 'next'

import Auth from '@/components/auth/Auth'

export const metadata: Metadata = {
	title: 'Auth'
}

const AuthPage = () => {
	return <Auth />
}

export default AuthPage
