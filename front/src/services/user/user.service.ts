import { IProduct } from '@Types/product.interface'
import { IUser } from '@Types/user.interface'

import { instance } from '@api/api.interceptor'

import { IUserDto } from './dto/user.dto'

const USERS = 'users/'

class UserService {
	async getProfile() {
		return instance<IUser>({
			url: USERS + 'profile',
			method: 'get'
		})
	}

	async updateProfile(dto: IUserDto) {
		return instance<IUser>({
			url: USERS + 'profile',
			method: 'put',
			data: dto
		})
	}

	async getFavourites() {
		return instance<IProduct[]>({
			url: USERS + 'favourites',
			method: 'get'
		})
	}

	async toggleFavourite(productId: string | number) {
		return instance<IUser>({
			url: USERS + `favourites/${productId}`,
			method: 'patch'
		})
	}
}

const userService = new UserService()

export default userService
