import { FC, PropsWithChildren } from 'react'

import Header from '../../header/components/Header'
import Menu from '../../menu/components/Menu'

const Main: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='flex h-[100vh] flex-col'>
			<Header />
			<main className='flex h-full flex-row'>
				<Menu />
				{children}
			</main>
		</div>
	)
}

export default Main
