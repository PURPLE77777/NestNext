import { IPaymentResponse } from '@Types/payment.interface'

import { instance } from '@api/api.interceptor'

const PAYMENT = 'payment/'

class PaymentService {
	async createPayment(amount: number) {
		return instance.post<IPaymentResponse>(PAYMENT, {
			amount
		})
	}
}

const paymentService = new PaymentService()

export default paymentService
