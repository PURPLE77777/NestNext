'use client'

import { useForm } from 'react-hook-form'

const Auth = () => {
	const { handleSubmit } = useForm()

	return (
		<div className='flex h-[100vh] items-center justify-center'>
			<div className='h-[550px] w-[350px] bg-[white]'></div>
		</div>
	)
}

export default Auth
