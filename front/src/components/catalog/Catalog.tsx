'use client'

import Image from 'next/image'
import { useState } from 'react'

import { ISection } from '@/constants/categories.constant'

const Catalog = () => {
	const [categories, setCategories] = useState<ISection[]>([])
	const iconsDimensions = 25

	return (
		<div className='flex w-full flex-col bg-[#f2f2f5]'>
			<div></div>
			<div className='flex'>
				<h1 className='text-2xl font-bold text-[#303541]'>
					Popular categories
				</h1>
				<Image
					className='ml-2'
					src={'/star.svg'}
					alt='profile'
					width={iconsDimensions}
					height={iconsDimensions}
				/>
			</div>
			<div className='flex items-center'>
				<h1 className='text-2xl font-bold text-[#303541]'>Hot deals</h1>
				<Image
					className='ml-2'
					src={'/fire.svg'}
					alt='profile'
					width={iconsDimensions}
					height={iconsDimensions}
				/>
			</div>
		</div>
	)
}

export default Catalog
