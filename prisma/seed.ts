import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
    await prisma.note.deleteMany()
    await prisma.user.deleteMany()

    const users = await Promise.all([
        prisma.user.create({
            data: {
                id: faker.string.uuid(),
                walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
            },
        }),
        prisma.user.create({
            data: {
                id: faker.string.uuid(),
                walletAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
            },
        }),
    ])

    console.log('[Seed] Creating notes...')

    for (const user of users) {
        const noteCount = faker.number.int({ min: 2, max: 5 })

        for (let i = 0; i < noteCount; i++) {
            await prisma.note.create({
                data: {
                    title: faker.lorem.sentence(),
                    content: faker.lorem.paragraphs({ min: 1, max: 3 }),
                    userId: user.id,
                },
            })
        }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
