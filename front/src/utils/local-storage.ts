export const getFromLocalStorage = (name: string) => {
	if (typeof window !== 'undefined') {
		const item = localStorage.getItem(name)
		return item ? JSON.parse(item) : null
	}
	return null
}
