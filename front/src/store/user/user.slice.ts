import { createSlice } from '@reduxjs/toolkit'

import { getFromLocalStorage } from '@utils/local-storage'

import { checkAuth, login, logout, registration } from './user.actions'
import { IInitialState } from './user.interface'

export const initialState: IInitialState = {
	user: getFromLocalStorage('user'),
	isLoading: false,
	error: null
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(registration.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(registration.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(registration.rejected, (state, { payload }) => {
				state.isLoading = false
				state.user = null
				state.error = payload
			})
			.addCase(login.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.isLoading = false
				state.user = null
				state.error = payload
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(checkAuth.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
			.addCase(checkAuth.rejected, (state, { payload }) => {
				state.isLoading = false
				state.user = null
				state.error = payload
			})
	}
})
