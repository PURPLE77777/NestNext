'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { IChapters, chapters, sections } from '@/constants/categories.constant'

const Menu = () => {
	const [categories, setCategories] = useState<string[]>([])
	const [allChapters, setAllChapters] = useState<IChapters[]>([])
	const [selectedSection, setSelectedSection] = useState('')
	const iconsDimensions = 25

	useEffect(() => {
		setCategories(sections)
		setAllChapters(chapters)
	}, [])

	return (
		<div className='w-[200px] border-t-2 border-solid border-[#42464b] bg-lightDark'>
			{allChapters.map(chapter => (
				<div key={`chapter-${chapter.name}`}>
					<div className='flex'>
						<Image
							src={chapter.icon}
							width={iconsDimensions}
							height={iconsDimensions}
							alt={`${chapter.name}`}
						/>
						<div className='text-[#fff]'>{chapter.name}</div>
					</div>
					{chapter.name === 'Categories' &&
						categories.map(category => (
							<div key={`category-menu-${category}`}>
								<div>{category}</div>
							</div>
						))}
				</div>
			))}
		</div>
	)
}

export default Menu
