import { Injectable, UnauthorizedException } from '@nestjs/common'
import { verifyLumiaToken } from '../utils/lumia'
import {PrismaService} from "nestjs-prisma";
import {UserDto} from "./user.dto";
import {mapResponse} from "../utils/common/map.response";


@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async verifySession(token: string): Promise<UserDto> {
        if (!token) {
            throw new UnauthorizedException('Missing session token')
        }

        try {
            const verification = await verifyLumiaToken(token)

            if (!verification?.valid || !verification.userId) {
                throw new UnauthorizedException('Invalid or expired Lumia token')
            }

            const walletAddress = verification.userId.toLowerCase()

            const user = await this.prisma.user.upsert({
                where: { walletAddress },
                update: {},
                create: { walletAddress },
            })

            return mapResponse(UserDto, user)
        } catch {
            throw new UnauthorizedException('Token verification failed')
        }
    }
}
