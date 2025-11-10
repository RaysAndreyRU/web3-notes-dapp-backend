import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import {PrismaService} from "nestjs-prisma";
import {verifyLumiaToken} from "../../lumia";


@Injectable()
export class LumiaSessionGuard implements CanActivate {
    constructor(private readonly prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const authHeader = req.headers['authorization']

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid Authorization header')
        }

        const token = authHeader.replace('Bearer ', '').trim()

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

        req.user = {
            id: user.id,
            walletAddress: user.walletAddress,
        }

        return true
    }
}
