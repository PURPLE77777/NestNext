import { CSSProperties, FC, PropsWithChildren } from 'react'
import { IconContext } from 'react-icons'

interface IIcon {
	color?: string
	className?: string
	style?: CSSProperties
	size?: string
}

const Icon: FC<PropsWithChildren<IIcon>> = ({ children, ...attrs }) => {
	return (
		<IconContext.Provider value={{ ...attrs }}>
			{children}
		</IconContext.Provider>
	)
}

export default Icon
