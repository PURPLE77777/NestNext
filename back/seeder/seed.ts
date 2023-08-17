import { faker } from '@faker-js/faker'
import { PrismaClient, Product } from '@prisma/client'
import * as dotenv from 'dotenv'
import { RandomWordOptions, generateSlug } from 'random-word-slugs'

dotenv.config()
const prisma = new PrismaClient()

const createProducts = async (quantity: number) => {
	const products: Product[] = []

	const productFullNameSlugConfig: RandomWordOptions<2> = {
		format: 'camel',
		partsOfSpeech: ['adjective', 'noun'],
		categories: {
			adjective: ['appearance'],
			noun: ['thing']
		}
	}
	const categoryFullNameSlugConfig: RandomWordOptions<1> = {
		format: 'camel',
		partsOfSpeech: ['noun'],
		categories: {
			noun: ['thing']
		}
	}

	for (let i = 0; i < quantity; i++) {
		const productSlug = generateSlug(3, productFullNameSlugConfig)
		const categorySlug = generateSlug(1, categoryFullNameSlugConfig)

		const productShortName = productSlug.split('-')[1]

		// const product = await prisma.product.create({
		// 			data: {
		// 				name: productShortName,
		// 				slug: productSlug,
		//                 description: faker.commerce.productDescription(),
		//                 price: +faker.commerce.price(10, 999, 0),
		//                 images: Array.from({length: getRandomNumber(2, 6)}).map(() => faker.image.url()),
		//                 category: {
		//                     create: {
		//                         name: categorySlug,

		//                     }
		//                 }
		// 			}
		// 		})
	}

	console.log(`Created ${products.length} products`)
}

async function main() {
	console.log('Start seeding...')
	await createProducts(10)
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
