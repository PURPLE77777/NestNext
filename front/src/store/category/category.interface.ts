import { ICategory } from '@Types/category.interface'

export interface ICategoryResponse extends ICategory {}

export interface IInitialState {
	categories: ICategoryResponse[] | null
	selectedCategory: ICategory | null
	isLoading: boolean
	error: any
}
