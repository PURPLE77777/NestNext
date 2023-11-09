'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { validEmail } from '@constants/regexp.constant'

import { useActions } from '@hooks/useActions'
import { useTypedSelector } from '@hooks/useTypedSelector'

import Loader from '@ui/loader/Loader'

import { IAuth } from './auth.interface'

const Auth = () => {
	const [isLogIn, setIsLogIn] = useState(true)
	const router = useRouter()
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<IAuth>({
		mode: 'onChange'
	})
	const iconsDimensions = 25
	const { user, isLoading, error } = useTypedSelector(({ user }) => user)
	const { login, registration } = useActions()

	const onSubmit: SubmitHandler<IAuth> = data => {
		if (isLogIn) {
			login(data)
		} else {
			registration(data)
		}
	}

	useEffect(() => {
		if (!isLoading && user) {
			router.replace('/')
		}
	}, [isLoading])

	return (
		<div className='flex h-[100vh] items-center justify-center'>
			<div className='flex w-[350px] flex-col bg-[white]'>
				<div className='mt-4 flex items-center justify-center'>
					<div>
						<Image
							src='/brand.png'
							alt='brand'
							width={iconsDimensions * 1.5}
							height={iconsDimensions * 1.5}
						/>
					</div>
					<span className='ml-4 text-3xl font-bold text-[black]'>
						PURPLESHOP
					</span>
				</div>
				<div className='m-5 h-full rounded-md border-2 border-solid border-[#f4f4f4] p-5'>
					<div className='flex justify-between'>
						<h2 className='text-2xl font-semibold text-[black]'>
							{isLogIn ? 'Log in' : 'Registration'}
						</h2>
						<button
							onClick={() => setIsLogIn(!isLogIn)}
							className='cursor-pointer text-[hsl(226,100%,56%)] underline'
						>
							{isLogIn ? 'Registration' : 'Log in'}
						</button>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='mt-3 flex flex-col'>
							<label className='font-semibold text-[black]'>
								Email
							</label>
							<input
								{...register('email', {
									required: true,
									pattern: {
										value: validEmail,
										message: 'Your email is invalid!'
									}
								})}
								disabled={isLoading}
								placeholder='Enter email...'
								className={clsx(
									'mt-1 w-full rounded-[4px] border-2 border-solid border-[#d1d1d1] bg-[white] px-2 py-[2px] text-[black]',
									isLoading && 'bg-[#cacaca]'
								)}
							/>
							{errors.email && (
								<span className='mt-2 text-[red]'>
									{errors.email.message}
								</span>
							)}
						</div>
						<div className='mt-3 flex flex-col'>
							<label className='font-semibold text-[black]'>
								Password
							</label>
							<input
								{...register('password', {
									required: true,
									minLength: {
										value: 5,
										message:
											'Min length is at least 5 symbols'
									}
								})}
								disabled={isLoading}
								placeholder='Enter passsword...'
								className={clsx(
									'mt-1 w-full rounded-[4px] border-2 border-solid border-[#d1d1d1] bg-[white] px-2 py-[2px] text-[black]',
									isLoading && 'bg-[#cacaca]'
								)}
							/>
							{errors.password && (
								<span className='mt-2 text-[red]'>
									{errors.password.message}
								</span>
							)}
						</div>
						<button
							disabled={isLoading}
							type='submit'
							className={clsx(
								'relative mt-5 w-full rounded-[4px] bg-[#f2c559] p-1 text-[black]'
							)}
						>
							<span>{isLogIn ? 'Log in' : 'Registration'}</span>
							{isLoading && <Loader />}
						</button>
						{error && error.message && (
							<span className='mt-2 text-[red]'>
								{error.message}
							</span>
						)}
					</form>
				</div>
				<div className='mx-5 mb-4'>
					<button
						className='cursor-pointer text-[#1f53ff] underline'
						disabled={isLoading}
						onClick={() => router.back()}
					>
						<span>&#8592;</span>Go back
					</button>
				</div>
			</div>
		</div>
	)
}

export default Auth
