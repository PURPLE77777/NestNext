import axios from 'axios'
import Cookies from 'js-cookie'

import { errorCatch, getContentType } from './api.helper'

export const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	headers: getContentType(),
	timeout: 5000
})

instance.interceptors.request.use(config => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		console.log(errorCatch(error))
		return errorCatch(error)
	}
)
