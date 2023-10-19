import { usePathname, useRouter } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

import { useAuth } from '@/hooks/selectors/useAuth'

interface ICheckRole {}

const CheckRole: FC<PropsWithChildren<ICheckRole>> = ({ children }) => {
	const { user } = useAuth()

	const router = useRouter()

	const pathname = usePathname()

	if (user) return <>{children}</>

	pathname !== '/auth' && router.replace('/auth')
	return null
}

export default CheckRole
