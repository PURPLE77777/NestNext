'use client'

import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import { BiHeart } from 'react-icons/bi'
import { MdOutlineShoppingCart } from 'react-icons/md'

import { useAuth } from '@/hooks/selectors/useAuth'
import { useCategory } from '@/hooks/selectors/useCategory'
import Icon from '@/providers/Icon.provider'
import productService from '@/services/product/product.service'
import userService from '@/services/user/user.service'
import { IProduct } from '@/types/product.interface'

const ProductCatalog = () => {
	const { selectedCategory } = useCategory()
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

	const isFavourite = (product: IProduct) => {
		return favourites?.some(favourite => favourite.id === product.id)
	}

	return (
		<div className='flex flex-wrap gap-4 p-5'>
			{isFetchingCategories ? (
				<h2>Loading...</h2>
			) : (
				categories?.map(product => (
					<div
						key={`product-${product.id}`}
						className='flex w-[200px] cursor-pointer flex-col rounded-2xl p-3 hover:bg-[#868688]'
					>
						<div className='flex flex-col justify-center rounded-xl bg-[#868688] p-4'>
							<div className='flex flex-nowrap justify-end'>
								<div
									className={clsx(
										'relative flex cursor-pointer items-center rounded-xl p-1 text-[#fff]',
										isFavourite(product) &&
											'bg-primOrange text-[#000]'
									)}
									// onClick={handleClick}
								>
									<Icon size={`${iconsDimensions}px`}>
										<BiHeart />
									</Icon>
								</div>
								<div
									className={clsx(
										'ml-1 flex cursor-pointer items-center rounded-xl p-1 text-[#fff]',
										isFavourite(product) &&
											'bg-primOrange text-[#000]'
									)}
									// onClick={handleClick}
								>
									<Icon size={`${iconsDimensions}px`}>
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
						<div className='mt-6 flex flex-1 flex-col justify-between'>
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
