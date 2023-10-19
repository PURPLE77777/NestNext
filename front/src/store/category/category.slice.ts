import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { getAllCategories } from './category.actions'
import { IInitialState } from './category.interface'
import { ICategory } from '@/types/category.interface'

const initialState: IInitialState = {
	categories: null,
	selectedCategory: null,
	isLoading: false,
	error: null
}

export const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		selectCategory(state, { payload }: PayloadAction<ICategory>) {
			state.selectedCategory = payload
		},
		deselectCategory(state) {
			state.selectedCategory = null
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getAllCategories.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(getAllCategories.fulfilled, (state, { payload }) => {
				state.categories = payload
				state.isLoading = false
			})
			.addCase(getAllCategories.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
	}
})
