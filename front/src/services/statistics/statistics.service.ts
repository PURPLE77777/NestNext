import { IStatisticsDto } from './dto/statistics.dto'
import { instance } from '@/api/api.interceptor'

const STATISTICS = 'statistics/'

class StatisticsService {
	async getAll() {
		return instance<IStatisticsDto[]>({
			url: STATISTICS + 'main',
			method: 'get'
		})
	}
}

const statisticsService = new StatisticsService()

export default statisticsService
