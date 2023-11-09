// 'use client'
import { FC, PropsWithChildren } from 'react'

import Catalog from '@components/catalog/Catalog'
import MainPage from '@components/main/Main'

const Page: FC<PropsWithChildren> = () => {
	return (
		<MainPage>
			<Catalog />
		</MainPage>
	)
}

export default Page
