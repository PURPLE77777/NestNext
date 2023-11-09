import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnReviewObject } from './return-review.obgect'
import { ReviewDto } from './review.dto'

@Injectable()
export class ReviewService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return this.prisma.review.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			select: returnReviewObject
		})
	}

	async getAverageValueByProductId(productId: number) {
		return this.prisma.review
			.aggregate({
				where: { id: productId },
				_avg: { rating: true }
			})
			.then(data => data._avg)
	}

	async create(userId: number, productId: number, dto: ReviewDto) {
		console.log('createReview', dto)
		return this.prisma.review.create({
			data: {
				...dto,
				product: {
					connect: {
						id: productId
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async delete(id: number) {
		return this.prisma.review.delete({
			where: {
				id
			}
		})
	}
}
