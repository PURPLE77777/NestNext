'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import AuthProvider from './auth-provider/AuthProvider'
import Main from '@/components/main/Main'
import { persistor, store } from '@/store/store'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

const GlobalClientProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AuthProvider isOnlyUser={true}>
						<Main />
						{children}
					</AuthProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}

export default GlobalClientProvider
