import Image from 'next/image'

import ProductCatalog from './components/ProductCatalog'

const Catalog = () => {
	const iconsDimensions = 25

	return (
		<div className='flex flex-1 flex-col overflow-auto'>
			{/* bg-[#f2f2f5] */}
			<div className='flex'>
				<h1 className='text-2xl font-bold text-[#303541]'>
					Popular categories
				</h1>
				<Image
					className='ml-2'
					src={'/star.svg'}
					alt='profile'
					width={iconsDimensions}
					height={iconsDimensions}
				/>
			</div>
			<div className='flex'>
				<h1 className='text-2xl font-bold text-[#303541]'>Hot deals</h1>
				<Image
					className='ml-2'
					src={'/fire.svg'}
					alt='profile'
					width={iconsDimensions}
					height={iconsDimensions}
				/>
			</div>
			<ProductCatalog />
		</div>
	)
}

export default Catalog
