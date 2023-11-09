'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useRef, useState } from 'react'
import { IoTrashBin } from 'react-icons/io5'
import { TbNavigationFilled } from 'react-icons/tb'

import productService from '@services/product/product.service'
import { ReviewDto } from '@services/review/dto/review.dto'
import reviewService from '@services/review/review.service'

import { getTimeByDate } from '@utils/getFormatTimeByDate'

import { sleep } from '@api/sleep'

import Icon from '@ui/icon/Icon'
import Loader from '@ui/loader/Loader'

interface IProductPage {
	productId: string
}

const Product: FC<IProductPage> = ({ productId }) => {
	const queryClient = useQueryClient()
	const textAreaRef = useRef<HTMLTextAreaElement>(null)
	const [deleteReviewId, setDeleteReviewId] = useState(-1)

	const { data: product } = useQuery({
		queryKey: ['product', productId],
		queryFn: async () => {
			try {
				const response = await productService.getById(productId)
				return response.data
			} catch (e) {
				console.warn(e)
			}
		}
	})

	const { mutate: mutateAddReview, isLoading: isAddReview } = useMutation({
		mutationFn: async (data: ReviewDto) => {
			await sleep()
			return await reviewService.leave(productId, data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['product', productId] })
			if (textAreaRef.current) textAreaRef.current.value = ''
		}
	})

	const createReview = async () => {
		if (textAreaRef.current) {
			mutateAddReview({ text: textAreaRef.current.value })
		}
	}

	const { mutate: mutateDeleteReview, isLoading: isDeleteReview } =
		useMutation({
			mutationFn: async (reviewId: number) => {
				await sleep()
				return await reviewService.delete(reviewId)
			},
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ['product', productId]
				})
			}
		})

	return (
		<div className='h-full w-full justify-center overflow-auto p-5'>
			{product && (
				<div className='flex h-full flex-col justify-between'>
					<div className='mb-8'>
						<div className='flex flex-row flex-wrap gap-5'>
							<div>
								<Image
									className='flex items-center justify-center'
									src={product.images[0]}
									width={300}
									height={500}
									alt={'Product'}
									unoptimized
								/>
							</div>
							<div className='flex flex-col justify-between '>
								<h3 className='text-[1.4em] font-bold'>
									{product.name}
								</h3>
								<p>{product.slug}</p>
								<p>{product.category.name}</p>
								<p className='text-[1.3em]'>
									Price: $
									<span className='font-bold'>
										{product.price}
									</span>
								</p>
								<div className='flex flex-row gap-3 overflow-auto'>
									{product.images.map(image => {
										return (
											<Image
												unoptimized
												key={`product_image-${image}`}
												src={image}
												width={100}
												height={100}
												alt=''
											/>
										)
									})}
								</div>
							</div>
						</div>
						<p className='mt-4 max-w-[1000px]'>
							{product.description}
						</p>
					</div>
					<div className='flex w-full flex-col gap-5 rounded-3xl border-[2px] border-solid border-[white] p-3'>
						<div className='flex flex-row flex-nowrap overflow-hidden rounded-2xl border-[2px] border-solid border-[transparent] focus-within:border-[white] '>
							<textarea
								ref={textAreaRef}
								rows={1}
								className='w-full resize-none overflow-hidden rounded-bl-2xl rounded-tl-2xl border-none p-2 pr-4'
								placeholder='Leave your review'
							/>
							<button
								onClick={createReview}
								disabled={isAddReview}
								className={clsx(
									'relative flex h-full w-8 items-center justify-center bg-primOrange hover:shadow-[0_0_5px_5px_#ff9900]',
									isAddReview && 'pointer-events-none'
								)}
							>
								<Icon
									className='rotate-90'
									size='20px'
									color='black'
								>
									<TbNavigationFilled />
								</Icon>
								{isAddReview && <Loader />}
							</button>
						</div>
						{product.reviews
							.sort(
								(a, b) =>
									new Date(b.createdAt).getTime() -
									new Date(a.createdAt).getTime()
							)
							.map((review, i, arr) => (
								<div
									key={`product_reviews-${review.id}`}
									className={clsx(
										'flex flex-row flex-nowrap gap-5',
										i !== arr.length - 1 &&
											'border-b-2 border-solid border-b-[white] pb-2'
									)}
								>
									<div className='flex flex-col items-center'>
										<Image
											className='rounded-full'
											unoptimized
											src={review.user.avatarPath}
											width={50}
											height={50}
											alt='AVATAR'
										/>
										<p>{review.user.name}</p>
									</div>
									<div className='flex w-full flex-col justify-between'>
										<div className='flex flex-1 flex-row flex-nowrap items-center justify-between gap-x-2'>
											<p className='h-full'>
												{review.text}
											</p>
											<button
												onClick={() => {
													setDeleteReviewId(review.id)
													mutateDeleteReview(
														review.id
													)
												}}
												className={clsx(
													'relative flex items-center justify-center rounded-md bg-primOrange hover:shadow-[0_0_5px_5px_#ff9900]',
													isDeleteReview &&
														'pointer-events-none'
												)}
											>
												<Icon
													className='p-1 hover:fill-[red]'
													size='30px'
													color='black'
												>
													<IoTrashBin />
												</Icon>
												{isDeleteReview &&
													deleteReviewId ===
														review.id && <Loader />}
											</button>
										</div>
										<div className='flex flex-row justify-between'>
											<p>
												{getTimeByDate(
													review.createdAt
												)}
											</p>
											{review.rating && (
												<p>
													Product rating:{' '}
													{review.rating}
												</p>
											)}
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			)}
		</div>
	)
}
export default Product
