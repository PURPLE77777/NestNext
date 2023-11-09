import { IUser } from './user.interface'

export interface IReview {
	id: number
	user: IUser
	text: string
	rating: string
	createdAt: string
}
