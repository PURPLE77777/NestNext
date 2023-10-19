export const getTimeByDate = (date: Date) => {
	const checkValue = (val: number): string => {
		return val > 9 ? `${val}` : `0${val}`
	}

	const year = date.getFullYear(),
		month = checkValue(date.getMonth()),
		day = checkValue(date.getDate()),
		hours = checkValue(date.getHours()),
		minutes = checkValue(date.getMinutes()),
		seconds = checkValue(date.getSeconds())

	return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}
