import { createSlice } from '@reduxjs/toolkit'

import { checkAuth, login, logout, register } from './user.actions'
import { IInitialState } from './user.interface'
import { getFromLocalStorage } from '@/utils/local-storage'

const initialState: IInitialState = {
	user: getFromLocalStorage('user'),
	isLoading: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(register.pending, (state, action) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.user = null
			})
			.addCase(login.pending, (state, action) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = null
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
	}
})
