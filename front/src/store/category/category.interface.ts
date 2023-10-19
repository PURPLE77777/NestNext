import { ICategory } from '@/types/category.interface'

export interface ICategoryResponse extends ICategory {}

export interface IInitialState {
	categories: ICategoryResponse[] | null
	selectedCategory: ICategory | null
	isLoading: boolean
	error: any
}
