import { useTypedSelector } from '../useTypedSelector'

export const useCategory = () =>
	useTypedSelector(({ categories }) => categories)
