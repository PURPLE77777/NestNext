import { createAsyncThunk } from '@reduxjs/toolkit'

import { removeFromStorage } from '@services/auth/auth.helper'
import authService from '@services/auth/auth.service'
import { AUTH } from '@services/base.constant'

import { errorCatch } from '@api/api.helper'

import { IAuthResponse, IEmailPassword } from './user.interface'

export const registration = createAsyncThunk<IAuthResponse, IEmailPassword>(
	`${AUTH}/register`,
	async (data, thunkApi) => {
		try {
			const response = await authService.main('register', data)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	`${AUTH}/login`,
	async (data, thunkApi) => {
		try {
			const response = await authService.main('login', data)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	removeFromStorage()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	`${AUTH}/check-auth`,
	async (_, thunkApi) => {
		try {
			const response = await authService.getNewTokens()
			return response
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				thunkApi.dispatch(logout())
			}
			return thunkApi.rejectWithValue(error)
		}
	}
)
