import { FC, PropsWithChildren } from 'react'

import Main from '@components/main/Main'

const ProductLayout: FC<PropsWithChildren> = ({ children }) => {
	return <Main>{children}</Main>
}

export default ProductLayout
