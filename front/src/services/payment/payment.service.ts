import { instance } from '@/api/api.interceptor'
import { IPaymentResponse } from '@/types/payment.interface'

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
