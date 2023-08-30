import { useTypesSelector } from './useTypedSelector'

export const useAuth = () => useTypesSelector(state => state.user)
