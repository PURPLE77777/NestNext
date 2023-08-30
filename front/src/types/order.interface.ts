import { ICardItem } from './card.interface'
import { IUser } from './user.interface'

export enum EnumOrderStatus {
	PENDING,
	PAYED,
	SHIPPED,
	DELIVERED
}

export interface IOrder {
	id: number
	items: ICardItem[]
	status: EnumOrderStatus
	user: IUser
	createdAt: Date
}
