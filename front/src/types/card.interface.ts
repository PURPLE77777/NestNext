import { IProduct } from './product.interface'

export interface ICardItem {
	id: number
	product: IProduct
	quantity: number
	price: number
}
