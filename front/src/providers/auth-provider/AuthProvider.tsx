import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { getAccessToken } from '@/services/auth/auth.helper'
import { IPage } from '@/types/pages.interface'

interface TypeAuthProvider extends IPage {}

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<PropsWithChildren<TypeAuthProvider>> = ({
	isOnlyUser,
	children
}) => {
	const { user } = useAuth()
	const { checkAuth, logout } = useActions()

	const { pathname } = useRouter()
	console.log(isOnlyUser)
	useEffect(() => {
		const accessToken = getAccessToken()
		if (accessToken) checkAuth()
	}, [])

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) logout()
	}, [pathname])

	return isOnlyUser ? (
		<DynamicCheckRole isOnlyUser={isOnlyUser} children={children} />
	) : (
		<>{children}</>
	)
}

export default AuthProvider
