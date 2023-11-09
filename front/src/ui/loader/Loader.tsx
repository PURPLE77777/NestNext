const Loader = () => {
	// const handler = (event: MouseEventHandler<HTMLDivElement, MouseEvent>) => {

	// }

	return (
		<div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
			{/* onClick={handler} */}
			<div className='absolute h-full w-full bg-[#000] opacity-50'></div>
			<span className='z-10 text-[#fff]'>Loading</span>
		</div>
	)
}

export default Loader
