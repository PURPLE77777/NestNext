'use client'

import { usePathname, useRouter } from 'next/navigation'
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

	const pathname = usePathname()

	if (user && isOnlyUser) return <>{children}</>

	pathname === '/auth' && router.replace('/auth')
	return null
}

export default CheckRole
