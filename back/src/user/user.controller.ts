import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Put('profile')
	async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto)
	}

	@Auth()
	@Get('profile')
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}

	@Auth()
	@Get('favourites')
	async getFavourites(@CurrentUser('id') id: number) {
		return this.userService.getFavourites(id)
	}

	@Auth()
	@Patch('favourites/:productId')
	async toggleFavourite(
		@CurrentUser('id') id: number,
		@Param('productId') productId: string
	) {
		return this.userService.toggleFavourite(id, +productId)
	}
}
