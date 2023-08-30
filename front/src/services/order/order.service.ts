import { instance } from '@/api/api.interceptor'
import { IOrder } from '@/types/order.interface'

const ORDERS = 'orders/'

class OrderService {
	async getAll() {
		return instance<IOrder[]>({
			url: ORDERS,
			method: 'get'
		})
	}
}

const orderService = new OrderService()

export default orderService
