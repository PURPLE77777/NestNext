import { IOrder } from '@Types/order.interface'

import { instance } from '@api/api.interceptor'

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
