import { REVIEWS } from '@services/base.constant'

import { IReview } from '@Types/review.interface'

import { instance } from '@api/api.interceptor'

import { ReviewDto } from './dto/review.dto'

class ReviewService {
	async getAll() {
		return instance<IReview[]>({
			url: REVIEWS,
			method: 'get'
		})
	}

	async leave(productId: string | number, data: ReviewDto) {
		return instance<IReview>({
			url: REVIEWS + `/leave/${productId}`,
			method: 'post',
			data
		})
	}

	async delete(reviewId: number) {
		return instance<IReview>({
			url: REVIEWS + `/${reviewId}`,
			method: 'delete'
		})
	}
}

const reviewService = new ReviewService()

export default reviewService
