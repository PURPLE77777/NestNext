import { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'

export const metadata: Metadata = {
	title: 'Auth'
}

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
	return <>{children}</>
}

export default AuthLayout
