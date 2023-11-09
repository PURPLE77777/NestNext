import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ReviewDto } from './review.dto'
import { ReviewService } from './review.service'

@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Get()
	async getAll() {
		return this.reviewService.getAll()
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Post('leave/:productId')
	async create(
		@CurrentUser('id') id: number,
		@Param('productId') productId: string,
		@Body() dto: ReviewDto
	) {
		return this.reviewService.create(id, +productId, dto)
	}

	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.reviewService.delete(+id)
	}
}
