import axios from 'axios'
import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@store/user/user.interface'

import { instance } from '@api/api.interceptor'
import { sleep } from '@api/sleep'

import { AUTH } from '../base.constant'

import { saveToStorage } from './auth.helper'

class AuthService {
	async main(type: 'login' | 'register', data: IEmailPassword) {
		await sleep()

		const response = await instance<IAuthResponse>({
			url: `/${AUTH}/${type}`,
			method: 'post',
			data
		})

		if (response.data && response.data.accessToken)
			saveToStorage(response.data)

		if (response.data) return response.data
		throw response
	}

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')
		const response = await axios.post<string, { data: IAuthResponse }>(
			process.env.NEXT_PUBLIC_SERVER_URL + `/${AUTH}/check-auth`,
			{ refreshToken }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		if (response.data) return response.data
		throw response
	}
}

const authService = new AuthService()

export default authService
