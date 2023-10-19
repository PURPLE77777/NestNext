import { createAsyncThunk } from '@reduxjs/toolkit'

import { ICategoryResponse } from './category.interface'
import { errorCatch } from '@/api/api.helper'
import { CATEGORIES } from '@/services/base.constant'
import categoryService from '@/services/category/category.service'

export const getAllCategories = createAsyncThunk<ICategoryResponse[]>(
	`${CATEGORIES}`,
	async (_, { rejectWithValue }) => {
		try {
			const response = await categoryService.getAll()
			return response.data
		} catch (error) {
			return rejectWithValue(errorCatch(error))
		}
	}
)
