import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { IPage } from '@/types/pages.interface'

interface ICheckRole extends IPage {}

const CheckRole: FC<PropsWithChildren<ICheckRole>> = ({
	isOnlyUser,
	children
}) => {
	const { user } = useAuth()

	const router = useRouter()

	if (user && isOnlyUser) return <>{children}</>

	router.pathname === '/auth' && router.replace('/auth')
	return null
}

export default CheckRole
