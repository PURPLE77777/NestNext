import { FC, PropsWithChildren } from 'react'

import Header from '../header/Header'
import Menu from '../menu/Menu'

const Main: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='flex h-full flex-col'>
			<Header />
			<main className='flex h-full flex-row'>
				<Menu />
				{children}
			</main>
		</div>
	)
}

export default Main
