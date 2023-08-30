import { ReviewDto } from './dto/review.dto'
import { instance } from '@/api/api.interceptor'
import { IReview } from '@/types/review.interface'

const REVIEWS = 'reviews/'

class ReviewService {
	async getAll() {
		return instance<IReview[]>({
			url: REVIEWS,
			method: 'get'
		})
	}

	async leave(productId: string | number, dto: ReviewDto) {
		return instance<IReview>({
			url: REVIEWS + `leave/${productId}`,
			method: 'post',
			data: dto
		})
	}
}

const reviewService = new ReviewService()

export default reviewService
