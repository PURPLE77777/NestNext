import { FC, PropsWithChildren } from 'react'
import { IconContext } from 'react-icons'

interface IIconType {
	color?: string
	size?: string
	className?: string
}

const Icon: FC<PropsWithChildren<IIconType>> = ({
	children,
	className,
	color,
	size
}) => {
	return (
		<IconContext.Provider value={{ className, color, size }}>
			{children}
		</IconContext.Provider>
	)
}

export default Icon
