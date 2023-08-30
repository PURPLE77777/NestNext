import { IUserDto } from './dto/user.dto'
import { instance } from '@/api/api.interceptor'
import { IUser } from '@/types/user.interface'

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

	async toggleFavourite(productId: string | number) {
		return instance<IUser>({
			url: USERS + `profile.favourites/${productId}`,
			method: 'patch'
		})
	}
}

const userService = new UserService()

export default userService
