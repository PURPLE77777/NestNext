import { faker } from '@faker-js/faker'
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService
	) {}

	async getNewToken(refreshToken: string) {
		let result
		try {
			result = await this.jwt.verifyAsync(refreshToken)
		} catch (e) {
			console.error(e)
			throw new UnauthorizedException('Invalid refresh token')
		}

		if (!result) throw new UnauthorizedException('Invalid refresh token')

		const user = await this.prisma.user.findUnique({
			where: {
				id: result.id
			}
		})

		const tokens = await this.issueToken(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async login(dto: AuthDto) {
		console.log('login', dto)
		const user = await this.validateUser(dto)
		const tokens = await this.issueToken(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})

		if (!user) throw new NotFoundException('The user not found')

		const isValid = await verify(user.password, dto.password)

		if (!isValid) throw new UnauthorizedException('InvalidPassword')

		return user
	}

	async register(dto: AuthDto) {
		console.log('register', dto)
		const oldUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})

		if (oldUser) throw new BadRequestException('The user already exists')

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: faker.person.firstName(),
				avatarPath: faker.image.avatar(),
				phone: faker.phone.number('+375 (##) ###-##-##'),
				password: await hash(dto.password)
			}
		})

		const tokens = await this.issueToken(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	private async issueToken(userId: number) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email,
			avatarPath: user.avatarPath,
			name: user.name,
			phone: user.phone,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		}
	}
}
