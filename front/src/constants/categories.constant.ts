import { BiCategoryAlt } from 'react-icons/bi'
import { BsBicycle, BsCamera } from 'react-icons/bs'
import { GiLipstick, GiPlantsAndAnimals, GiSmartphone } from 'react-icons/gi'
import { GoGift } from 'react-icons/go'
import { IoGameControllerOutline, IoHeadsetOutline } from 'react-icons/io5'
import { LuShirt, LuSofa } from 'react-icons/lu'
import {
	MdOutlineComputer,
	MdOutlinePercent,
	MdOutlineSportsVolleyball
} from 'react-icons/md'
import { PiMusicNotesDuotone, PiQuestion } from 'react-icons/pi'
import { RxHobbyKnife } from 'react-icons/rx'

export interface ISection {
	name: string
	icon: React.ElementType
}

export const sections: ISection[] = [
	{ name: 'Echo and Alexa', icon: MdOutlineComputer },
	{ name: 'Kindle', icon: LuSofa },
	{ name: 'Books', icon: GiSmartphone },
	{ name: 'Electronics', icon: BsCamera },
	{ name: 'Home and Gaeden', icon: LuShirt },
	{ name: 'Fashion', icon: BsBicycle },
	{ name: 'Health and Beauty', icon: IoHeadsetOutline },
	{ name: 'Automotive', icon: GiLipstick },
	{ name: 'Sport and Tourism', icon: MdOutlineSportsVolleyball },
	{ name: 'Games', icon: IoGameControllerOutline },
	{ name: 'Film and Music', icon: PiMusicNotesDuotone },
	{ name: 'Animals', icon: GiPlantsAndAnimals },
	{ name: 'Hobby', icon: RxHobbyKnife },
	{ name: 'Gift Cards', icon: GoGift }
]

export interface IChapter {
	name: string
	icon: React.ElementType
}

export const chapters: IChapter[] = [
	{ name: 'Categories', icon: BiCategoryAlt },
	{ name: 'Sell on Amazon', icon: MdOutlinePercent },
	{ name: 'Help', icon: PiQuestion }
]
