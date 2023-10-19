import { BiCategoryAlt } from 'react-icons/bi'
import { MdOutlinePercent } from 'react-icons/md'
import { PiQuestion } from 'react-icons/pi'

export interface ISection {
	name: string
	icon: React.ElementType
}

export interface IChapter {
	name: string
	icon: React.ElementType
}

export const chapters: IChapter[] = [
	{ name: 'Categories', icon: BiCategoryAlt },
	{ name: 'Sell on Amazon', icon: MdOutlinePercent },
	{ name: 'Help', icon: PiQuestion }
]
