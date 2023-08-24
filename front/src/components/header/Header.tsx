'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { sections } from '@/constants/categories.constant'

const Header = () => {
	const [value, setValue] = useState<string>('')
	const [categories, setCategories] = useState<string[]>([])
	const iconsDimensions = 50

	useEffect(() => setCategories(sections), [])

	return (
		<header className='flex flex-row justify-between bg-lightDark p-3'>
			<div className='flex w-full max-w-[600px] flex-row items-center justify-between'>
				<div>
					<Image
						src='/brand.png'
						alt='brand'
						width={iconsDimensions}
						height={iconsDimensions}
					/>
				</div>
				<div className='relative flex flex-row text-[#fff] after:pointer-events-none after:absolute after:right-[52px] after:top-[15px] after:text-[12px] after:text-[#fff] after:content-["▼"]'>
					<input
						className='rounded-bl-lg rounded-tl-lg border-2 border-solid border-[#42464b] bg-[#0f1420] px-3 py-2 outline-none'
						placeholder='Search...'
					></input>
					<select
						className='appearance-none border-2 border-l-0 border-r-0 border-solid border-[#42464b] bg-[#0f1420] pl-2 pr-6 text-[#fff]'
						value={value}
						onChange={e => {
							setValue(e.target.value)
						}}
					>
						<option value=''>All categories</option>
						{categories.map(category => (
							<option key={`header-${category}`} value={category}>
								{category}
							</option>
						))}
					</select>
					<button className='rounded-br-lg rounded-tr-lg bg-primOrange p-2'>
						<Image
							src={'/search.svg'}
							alt='search'
							width={iconsDimensions / 2}
							height={iconsDimensions / 2}
						/>
					</button>
				</div>
			</div>

			<div className='flex flex-row items-center'>
				<div className='flex cursor-pointer items-center rounded-xl p-2 hover:bg-primOrange'>
					<Image
						src={'/heart.svg'}
						alt='heart'
						width={iconsDimensions / 2}
						height={iconsDimensions / 2}
					/>
				</div>
				<div className='ml-3 flex cursor-pointer items-center rounded-xl p-2 hover:bg-primOrange'>
					<Image
						src={'/basket.svg'}
						alt='basket'
						width={iconsDimensions / 2}
						height={iconsDimensions / 2}
					/>
				</div>
				<div className='ml-3 flex cursor-pointer items-center rounded-xl p-2 hover:bg-primOrange'>
					<Image
						src={'/notification-none.svg'}
						alt='notifications'
						width={iconsDimensions / 2}
						height={iconsDimensions / 2}
					/>
				</div>
				<div className='ml-3 cursor-pointer'>
					<Image
						src={'/avatar.svg'}
						alt='profile'
						width={iconsDimensions}
						height={iconsDimensions}
					/>
				</div>
			</div>
		</header>
	)
}

export default Header
