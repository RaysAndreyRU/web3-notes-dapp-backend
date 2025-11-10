import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { User } from '@prisma/client'

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findOrCreateByWalletAddress(walletAddress: string): Promise<User> {
        return this.prisma.user.upsert({
            where: { walletAddress },
            update: {},
            create: { walletAddress },
        })
    }

    async findByWalletAddress(walletAddress: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { walletAddress } })
    }
}
