'use client'

import Cookies from 'js-cookie'
import Image from 'next/image'
import { BiHeart } from 'react-icons/bi'
import {
	MdOutlineNotificationsNone,
	MdOutlineShoppingCart
} from 'react-icons/md'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import Icon from '@/providers/Icon.provider'
import { getAccessToken } from '@/services/auth/auth.helper'

const PersonActivities = () => {
	const iconsDimensions = 25
	const { user } = useAuth()
	const { checkAuth, logout } = useActions()

	// const pathname = usePathname()

	const handleClick = () => {
		const accessToken = getAccessToken()
		console.log(accessToken)
		if (accessToken) checkAuth()
		else {
			const refreshToken = Cookies.get('refreshToken')
			if (!refreshToken && user) logout()
		}
	}

	return (
		<div className='flex flex-row items-center'>
			<div
				className='flex cursor-pointer items-center rounded-xl p-2 text-[#fff] hover:bg-primOrange hover:text-[#000]'
				onClick={handleClick}
			>
				<Icon size={`${iconsDimensions}px`}>
					<BiHeart />
				</Icon>
			</div>
			<div
				className='ml-3 flex cursor-pointer items-center rounded-xl p-2 text-[#fff] hover:bg-primOrange hover:text-[#000]'
				onClick={handleClick}
			>
				<Icon size={`${iconsDimensions}px`}>
					<MdOutlineShoppingCart />
				</Icon>
			</div>
			<div
				className='ml-3 flex cursor-pointer items-center rounded-xl p-2 text-[#fff] hover:bg-primOrange hover:text-[#000]'
				onClick={handleClick}
			>
				<Icon size={`${iconsDimensions}px`}>
					<MdOutlineNotificationsNone />
				</Icon>
			</div>
			<div className='ml-3 cursor-pointer' onClick={handleClick}>
				<Image
					src={'/avatar.svg'}
					alt='profile'
					width={iconsDimensions * 2}
					height={iconsDimensions * 2}
				/>
			</div>
		</div>
	)
}

export default PersonActivities
