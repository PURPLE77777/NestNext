import { FC, PropsWithChildren } from 'react'

import Header from '../header/Header'
import Menu from '../menu/Menu'

const MainPage: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='flex h-[100vh] flex-col'>
			<Header />
			<main className='flex flex-1 flex-row overflow-hidden'>
				<Menu />
				{children}
			</main>
		</div>
	)
}

export default MainPage
