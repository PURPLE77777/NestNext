import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import { categorySlice } from './category/category.slice'
import { createPersistStorage } from './storage'
import { userSlice } from './user/user.slice'

const persistConfig = {
	key: 'purpleshop',
	storage: createPersistStorage(),
	whitelist: ['user', 'categories']
}

const rootReducer = combineReducers({
	user: userSlice.reducer,
	categories: categorySlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
			// serializableCheck: {
			// 	ignoredActions: [
			// 		FLUSH,
			// 		REHYDRATE,
			// 		PAUSE,
			// 		PERSIST,
			// 		PURGE,
			// 		REGISTER
			// 	]
			// }
		})
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>
