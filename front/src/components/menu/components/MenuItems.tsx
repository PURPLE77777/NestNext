'use client'

import clsx from 'clsx'
import { SyntheticEvent, useEffect, useState } from 'react'

import { IChapter, chapters } from '@/constants/categories.constant'
import { useCategory } from '@/hooks/selectors/useCategory'
import { useActions } from '@/hooks/useActions'
import Icon from '@/providers/Icon.provider'
import { ICategory } from '@/types/category.interface'

export const MenuItems = () => {
	const { categories } = useCategory()
	const { getAllCategories, selectCategory, deselectCategory } = useActions()
	const [allChapters, setAllChapters] = useState<IChapter[]>([])
	const [selectedChapter, setSelectedChapter] = useState('')
	const { selectedCategory } = useCategory()

	useEffect(() => {
		setAllChapters(chapters)
		setSelectedChapter(chapters[0].name)
		getAllCategories()
	}, [allChapters])

	const chapterClickHandler = (e: SyntheticEvent) => {
		setSelectedChapter((e.target as HTMLDivElement).textContent!)
		deselectCategory()
	}

	const categoryHandler = (category: ICategory) => {
		selectCategory(category)
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
						categories?.map(category => (
							<div
								className={clsx(
									'flex cursor-pointer items-center rounded-xl p-2 text-[#fff] hover:bg-[#2d3c4c]',
									selectedCategory &&
										selectedCategory.name ===
											category.name &&
										'underline'
								)}
								key={`category-menu-${category.name}`}
								onClick={() => categoryHandler(category)}
							>
								<div className='ml-[20px] pl-2 text-sm '>
									{category.name}
								</div>
							</div>
						))}
				</div>
			))}
		</div>
	)
}
