import { IUser } from '@Types/user.interface'

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUser | null
	isLoading: boolean
	error: any
}

export interface IEmailPassword {
	email: string
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
