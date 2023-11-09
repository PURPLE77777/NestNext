'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { BiHeart } from 'react-icons/bi'
import { MdOutlineShoppingCart } from 'react-icons/md'

import productService from '@services/product/product.service'
import userService from '@services/user/user.service'

import { useAuth } from '@hooks/selectors/useAuth'
import { useCategory } from '@hooks/selectors/useCategory'

import { IProduct } from '@Types/product.interface'

import { sleep } from '@api/sleep'

import Icon from '@ui/icon/Icon'
import Loader from '@ui/loader/Loader'

const ProductCatalog = () => {
	const router = useRouter()
	const [toggleProductId, setToggleProductId] = useState(-1)
	const { selectedCategory } = useCategory()
	const queryClient = useQueryClient()
	const { user } = useAuth()
	const imageWidth = 200,
		imageHeight = 200,
		iconsDimensions = 25

	const { data: categories, isFetching: isFetchingCategories } = useQuery({
		queryKey: [
			'category_products',
			selectedCategory ? selectedCategory.id : 'all'
		],
		queryFn: async () => {
			try {
				const response = selectedCategory
					? await productService.getByCategory(selectedCategory!.slug)
					: await productService.getAll()
				return response.data
			} catch (e) {
				console.error(e)
			}
		}
	})

	const { data: favourites } = useQuery({
		enabled: !!user,
		queryKey: ['favourites', user?.email],
		queryFn: async () => {
			try {
				const response = await userService.getFavourites()
				return response.data
			} catch (e) {
				console.warn(e)
			}
		}
	})

	const { mutate, isLoading } = useMutation({
		mutationFn: async (productId: number) => {
			setToggleProductId(productId)
			await sleep(1000)
			return await userService.toggleFavourite(productId)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['favourites', user?.email]
			})
		}
	})

	const isFavourite = (product: IProduct) => {
		return favourites?.some(favourite => favourite.id === product.id)
	}

	const productHandle = (product: IProduct) => {
		router.push(`/products/${product.id}`)
	}

	// const favouriteHandler = async (productId: number) => {}
	console.log('favourites', favourites)
	return (
		<div className='m-5 flex flex-wrap gap-5'>
			{isFetchingCategories ? (
				<h2>Loading...</h2>
			) : (
				categories?.map(product => (
					<div
						key={`product-${product.id}`}
						className='mt-0 flex w-[200px] cursor-pointer flex-col rounded-2xl hover:bg-[#868688]'
						onClick={() => productHandle(product)}
					>
						<div className='flex flex-col justify-center rounded-xl bg-[#868688] p-3 pt-2'>
							<div className='flex flex-nowrap justify-end'>
								<div
									className={clsx(
										'relative m-1 flex cursor-pointer items-center rounded-lg p-1 text-[#fff]'
										// isFavourite(product)
										// 	? 'bg-primOrange text-[#000] hover:bg-[#ed8f02]'
										// 	: 'hover:bg-[#adacaa]'
									)}
									onClick={e => {
										e.stopPropagation()
										mutate(product.id)
									}}
								>
									{isFavourite(product) ? (
										<Icon
											className='hover:fill-[#ed8f02]'
											color='#ff9900'
											size={`${iconsDimensions}px`}
										>
											<AiFillHeart />
										</Icon>
									) : (
										<Icon
											className='hover:fill-primOrange'
											color='black'
											size={`${iconsDimensions}px`}
										>
											<BiHeart />
										</Icon>
									)}

									{isLoading &&
										toggleProductId === product.id && (
											<Loader />
										)}
								</div>
								<div
									className={clsx(
										'relative m-1 mr-0 flex cursor-pointer items-center rounded-lg p-1 text-[#fff] hover:bg-[#aaaaad]'
										// isFavourite(product) &&
										// 	'bg-primOrange text-[#000]'
									)}
									// onClick={handleClick}
								>
									<Icon
										className='relative'
										size={`${iconsDimensions}px`}
									>
										<MdOutlineShoppingCart />
									</Icon>
								</div>
							</div>
							<div className='flex h-[150px] items-center justify-center overflow-hidden rounded-xl bg-[url("/no-image-icon.png")] bg-contain bg-center bg-no-repeat'>
								<Image
									className='h-fit border-none outline-none'
									width={imageWidth}
									height={imageHeight}
									unoptimized
									src={product.images[0]}
									alt={''}
								/>
							</div>
						</div>
						<div className='m-3 mt-6 flex flex-1 flex-col justify-between'>
							<div>
								<h4 className='break-words text-[12pt] font-bold'>
									{product.name}
								</h4>
								<p className='my-2 text-[10pt] font-bold'>
									{product.category.name}
								</p>
							</div>
							<p className='text-[18pt] font-bold'>
								${product.price.toFixed(2)}
							</p>
						</div>
					</div>
				))
			)}
		</div>
	)
}

export default ProductCatalog
