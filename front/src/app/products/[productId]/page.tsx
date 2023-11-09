import { Metadata } from 'next'

import Product from '@components/product/Product'

export const metadata: Metadata = {
	title: 'Product'
}

// const getProduct = async (productId: string) => {
// 	const product = await axios.get<IProduct[]>(
// 		process.env.NEXT_PUBLIC_SERVER_URL + PRODUCTS + productId
// 	)
// 	console.log('getProduct', product.data)
// 	return {}
// }

const Page = async ({
	params: { productId }
}: {
	params: { productId: string }
}) => {
	return <Product productId={productId} />
}

export default Page
