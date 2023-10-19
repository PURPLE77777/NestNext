'use client'

import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { BiHeart } from 'react-icons/bi'
import {
	MdOutlineNotificationsNone,
	MdOutlineShoppingCart
} from 'react-icons/md'

import { useAuth } from '@/hooks/selectors/useAuth'
import { useActions } from '@/hooks/useActions'
import Icon from '@/providers/Icon.provider'
import { getAccessToken } from '@/services/auth/auth.helper'
import userService from '@/services/user/user.service'

const PersonActivities = () => {
	const iconsDimensions = 25
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
				{data && (
					<span className='absolute right-2 top-1 bg-[red]'>
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
