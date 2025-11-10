import { jwtManager } from './lumia.config'
import { verifyToken } from '@lumiapassport/core'

export async function verifyLumiaToken(token: string) {
    if (!token) throw new Error('Missing Lumia session token')

    await jwtManager.setTokens({
        accessToken: token,
        refreshToken: '',
        userId: '',
        expiresIn: 0,
        hasKeyshare: false,
    })

    return await verifyToken(jwtManager)
}
