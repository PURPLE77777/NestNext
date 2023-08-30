import axios from 'axios'
import Cookies from 'js-cookie'

import { saveToStorage } from './auth.helper'
import { instance } from '@/api/api.interceptor'
import { IAuthResponse, IEmailPassword } from '@/store/user/user.interface'

class AuthService {
	async main(type: 'login' | 'register', data: IEmailPassword) {
		const response = await instance<IAuthResponse>({
			url: `/auth/${type}`,
			method: 'post',
			data
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	}

	async getNewTokens() {
		const refreshToken = Cookies.get('refresh-token')
		const response = await axios.post<string, { data: IAuthResponse }>(
			process.env.SERVER_URL + '/auth/login/access-token',
			{ refreshToken }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}
}

const authService = new AuthService()

export default authService
