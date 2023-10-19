'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'

import PersonActivities from './components/PersonActivities'
import { useCategory } from '@/hooks/selectors/useCategory'
import { useActions } from '@/hooks/useActions'
import Icon from '@/providers/Icon.provider'

const Header = () => {
	const [value, setValue] = useState<string>('')
	const { categories, selectedCategory } = useCategory()
	const { selectCategory, deselectCategory } = useActions()
	const iconsDimensions = 25

	useEffect(() => {
		selectedCategory ? setValue(selectedCategory.name) : setValue('')
	}, [selectedCategory])

	return (
		<header className='flex flex-row justify-between bg-lightDark p-3'>
			<div className='flex w-full max-w-[670px] flex-row items-center justify-between'>
				<div>
					<Image
						src='/brand.png'
						alt='brand'
						width={iconsDimensions * 2}
						height={iconsDimensions * 2}
					/>
				</div>
				<div className='relative flex flex-row text-[#fff] after:pointer-events-none after:absolute after:right-[52px] after:top-[15px] after:text-[12px] after:text-[#fff] after:content-["▼"]'>
					<input
						className='rounded-bl-lg rounded-tl-lg border-2 border-solid border-[#444d55] bg-[#222f3e] px-3 py-2 outline-none'
						placeholder='Search...'
					/>
					<select
						className='appearance-none border-2 border-l-0 border-r-0 border-solid border-[#444d55] bg-[#222f3e] pl-2 pr-6 text-[#fff]'
						value={value}
						onChange={e => {
							setValue(e.target.value)
						}}
					>
						<option
							value=''
							onClick={() => {
								deselectCategory()
							}}
						>
							All categories
						</option>
						{categories?.map(category => (
							<option
								key={`header-${category.name}`}
								value={category.name}
								onClick={() => {
									selectCategory(category)
								}}
							>
								{category.name}
							</option>
						))}
					</select>
					<button className='rounded-br-lg rounded-tr-lg bg-primOrange p-2'>
						<Icon size={`${iconsDimensions}px`}>
							<IoSearch />
						</Icon>
					</button>
				</div>
			</div>

			<PersonActivities />
		</header>
	)
}

export default Header
