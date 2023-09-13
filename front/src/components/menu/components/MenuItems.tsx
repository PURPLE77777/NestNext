'use client'

import clsx from 'clsx'
import { SyntheticEvent, useEffect, useState } from 'react'

import {
	IChapter,
	ISection,
	chapters,
	sections
} from '@/constants/categories.constant'
import Icon from '@/providers/Icon.provider'

export const MenuItems = () => {
	const [categories, setCategories] = useState<ISection[]>([])
	const [allChapters, setAllChapters] = useState<IChapter[]>([])
	const [selectedChapter, setSelectedChapter] = useState('')

	useEffect(() => {
		setCategories(sections)
		setAllChapters(chapters)
		setSelectedChapter(chapters[0].name)
	}, [])

	const chapterClickHandler = (e: SyntheticEvent) => {
		setSelectedChapter((e.target as HTMLDivElement).textContent!)
	}

	return (
		<div>
			{allChapters.map(chapter => (
				<div key={`chapter-${chapter.name}`}>
					<div
						className={clsx(
							'relative flex cursor-pointer items-center rounded-xl p-2 before:absolute before:-left-4 before:top-[4px] before:h-7 before:w-1 before:rounded-br-lg before:rounded-tr-lg before:bg-primOrange before:content-[""] hover:bg-[#2d3c4c]',
							selectedChapter === chapter.name
								? 'text-[#ee9515]'
								: 'text-[#fff] before:hidden'
						)}
						onClick={chapterClickHandler}
					>
						<Icon size='20px'>
							<chapter.icon />
						</Icon>
						<div className='h-fit pl-2 text-sm font-bold'>
							{chapter.name}
						</div>
					</div>
					{selectedChapter === allChapters[0].name &&
						chapter.name === allChapters[0].name &&
						categories.map(category => (
							<div
								className='flex items-center p-2 text-[#fff]'
								key={`category-menu-${category.name}`}
							>
								<div className='p-[10px]'></div>
								<div className='pl-2 text-sm'>
									{category.name}
								</div>
							</div>
						))}
				</div>
			))}
		</div>
	)
}
