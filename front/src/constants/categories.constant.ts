export const sections = [
	'Categories',
	'Echo and Alexa',
	'Kindle',
	'Books',
	'Electronics',
	'Home and Gaeden',
	'Fashion',
	'Health and Beauty',
	'Automotive',
	'Sport and Tourism',
	'Games',
	'Film and Music',
	'Animals',
	'Hobby',
	'Gift Cards'
]

export interface IChapters {
	name: string
	icon: string
}

export const chapters: IChapters[] = [
	{ name: 'Categories', icon: '/category.svg' },
	{ name: 'Sell on Amazon', icon: '/percent.svg' },
	{ name: 'Help', icon: '/question-circle.svg' }
]
