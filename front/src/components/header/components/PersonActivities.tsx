'use client'

import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { BiHeart } from 'react-icons/bi'
import {
	MdOutlineNotificationsNone,
	MdOutlineShoppingCart
} from 'react-icons/md'

import { getAccessToken } from '@services/auth/auth.helper'
import userService from '@services/user/user.service'

import { useAuth } from '@hooks/selectors/useAuth'
import { useActions } from '@hooks/useActions'

import Icon from '@ui/icon/Icon'

const PersonActivities = () => {
	const iconsDimensions = 35
	const { user } = useAuth()
	const { checkAuth, logout } = useActions()

	// const pathname = usePathname()

	const checkUserAuth = () => {
		const accessToken = getAccessToken()
		console.log(accessToken)
		if (accessToken) checkAuth()
		else {
			const refreshToken = Cookies.get('refreshToken')
			if (!refreshToken && user) logout()
		}
	}

	const handleClick = () => {
		if (!user) {
			checkUserAuth
		} else {
			console.log(user)
		}
	}

	const { data, isFetching } = useQuery({
		enabled: !!user,
		queryKey: ['favourites', user?.email],
		queryFn: async () => {
			try {
				const response = await userService.getFavourites()
				return response.data
			} catch (e) {
				console.warn(e)
			}
		}
	})

	return (
		<div className='flex flex-row items-center'>
			<div
				className='relative flex cursor-pointer items-center rounded-xl p-2 text-[#fff] hover:bg-primOrange hover:text-[#000]'
				onClick={handleClick}
			>
				<Icon size={`${iconsDimensions}px`}>
					<BiHeart />
				</Icon>
				{data && data.length > 0 && (
					<span className='absolute right-1 top-[25px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[red] text-[13px] font-bold'>
						{data.length}
					</span>
				)}
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
			<div
				className='ml-3 cursor-pointer overflow-hidden rounded-full'
				onClick={handleClick}
			>
				<Image
					className='flex items-center justify-center'
					src={user ? user.avatarPath : '/avatar.svg'}
					alt='AVATAR'
					width={iconsDimensions * 2}
					height={iconsDimensions * 2}
					unoptimized
				/>
			</div>
		</div>
	)
}

export default PersonActivities
