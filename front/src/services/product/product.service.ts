import { IFiltersDto, IProductDto } from './dto/product.dto'
import { instance } from '@/api/api.interceptor'
import { IProduct } from '@/types/product.interface'

const PRODUCTS = 'products/'

class ProductService {
	async getAll(queryData = {} as IFiltersDto) {
		return instance<IProduct[]>({
			url: PRODUCTS,
			method: 'get',
			params: queryData
		})
	}

	async getSimilar(productId: string | number) {
		return instance<IProduct[]>({
			url: PRODUCTS + `similat/${productId}`,
			method: 'get'
		})
	}

	async getBySlug(slug: string) {
		return instance<IProduct[]>({
			url: PRODUCTS + `by-slug/${slug}`,
			method: 'get'
		})
	}

	async getByCategory(categorySlug: string) {
		return instance<IProduct[]>({
			url: PRODUCTS + `by-category/${categorySlug}`,
			method: 'get'
		})
	}

	async getById(id: string | number) {
		return instance<IProduct>({
			url: PRODUCTS + `by-id/${id}`,
			method: 'get'
		})
	}

	async create() {
		return instance<IProduct>({
			url: PRODUCTS,
			method: 'post'
		})
	}

	async update(id: string | number, dto: IProductDto) {
		return instance<IProduct>({
			url: PRODUCTS + id,
			method: 'put',
			data: dto
		})
	}

	async delete(id: string | number) {
		return instance<IProduct>({
			url: PRODUCTS + id,
			method: 'delete'
		})
	}
}

const productService = new ProductService()

export default productService
