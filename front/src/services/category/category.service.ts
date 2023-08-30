import { instance } from '@/api/api.interceptor'
import { ICategory } from '@/types/category.interface'

const CATEGORIES = 'categories/'

class CategoryService {
	async getAll() {
		return instance<ICategory[]>({
			url: CATEGORIES,
			method: 'get'
		})
	}

	async getById(id: string | number) {
		return instance<ICategory>({
			url: CATEGORIES + id,
			method: 'get'
		})
	}

	async getBySlug(slug: string) {
		return instance<ICategory>({
			url: CATEGORIES + `by-slug/${slug}`,
			method: 'get'
		})
	}

	async create() {
		return instance<ICategory>({
			url: CATEGORIES,
			method: 'post'
		})
	}

	async update(id: string | number, name: string) {
		return instance<ICategory>({
			url: CATEGORIES + id,
			method: 'put',
			data: { name }
		})
	}

	async delete(id: string | number) {
		return instance<ICategory>({
			url: CATEGORIES + id,
			method: 'delete'
		})
	}
}

const categoryService = new CategoryService()

export default categoryService
