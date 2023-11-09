export const getTimeByDate = (date: string) => {
	const dt = new Date(date)
	const checkValue = (val: number): string => {
		return val > 9 ? `${val}` : `0${val}`
	}

	const year = dt.getFullYear(),
		month = checkValue(dt.getMonth()),
		day = checkValue(dt.getDate()),
		hours = checkValue(dt.getHours()),
		minutes = checkValue(dt.getMinutes()),
		seconds = checkValue(dt.getSeconds())

	return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}
