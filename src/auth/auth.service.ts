import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { verifyLumiaToken } from '../utils/lumia'
import { UserDto } from './user.dto'
import { AuthDataDto } from './auth-data.dto'
import { mapResponse } from '../utils/common/map.response'

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async verifySession(authData: AuthDataDto): Promise<UserDto> {
        if (!authData?.accessToken) {
            throw new UnauthorizedException('Missing Lumia session token')
        }

        try {
            const verification = await verifyLumiaToken(authData)

            if (!verification?.valid || !verification.userId) {
                throw new UnauthorizedException('Invalid or expired Lumia token')
            }

            const walletAddress = verification.userId.toLowerCase()

            const user = await this.prisma.user.upsert({
                where: { id: authData.userId },
                update: {
                    walletAddress: authData.walletAddress?.toLowerCase() ?? null,
                },
                create: {
                    id: authData.userId,
                    walletAddress: authData.walletAddress?.toLowerCase() ?? null,
                },
            })

            return mapResponse(UserDto, user)
        } catch {
            throw new UnauthorizedException('Token verification failed')
        }
    }
}
