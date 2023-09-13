'use client'

import { useRouter } from 'next/navigation'
import { MdLogout } from 'react-icons/md'

import { MenuItems } from './MenuItems'
import { useAuth } from '@/hooks/useAuth'
import Icon from '@/providers/Icon.provider'

const Menu = () => {
	const { user } = useAuth()
	const router = useRouter()

	const chapterClickHandler = () => {
		router.push('/auth')
	}

	return (
		<div className='flex w-[250px] flex-col justify-between border-t-2 border-solid border-[#444d55] bg-lightDark py-4 pl-4 pr-2'>
			<MenuItems />
			<div
				className='flex cursor-pointer items-center rounded-xl p-2 text-[#fff] hover:bg-[#2d3c4c]'
				onClick={chapterClickHandler}
			>
				<Icon size='20px'>
					<MdLogout />
				</Icon>
				<div
					className='h-fit pl-2 text-sm font-bold'
					onClick={chapterClickHandler}
				>
					{user ? 'Log out' : 'Log in'}
				</div>
			</div>
		</div>
	)
}

export default Menu
