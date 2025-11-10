import { ApiProperty } from '@nestjs/swagger'
import {BaseDto} from "../utils/common/base-entity";

export class AuthDataDto extends  BaseDto<AuthDataDto>{
    @ApiProperty({
        example: '0x1234567890abcdef1234567890abcdef12345678',
        description: 'Wallet address of the authenticated user',
    })
    walletAddress: string

    @ApiProperty({
        example: 'b2cfa91b-2289-4d89-93ff-4a3b3a054cb2',
        description: 'Optional session ID returned by Lumia Passport',
        required: false,
    })
    sessionId?: string

    @ApiProperty({
        example: 1736448284,
        description: 'Token expiration timestamp (UNIX time)',
        required: false,
    })
    exp?: number

    @ApiProperty({
        example: true,
        description: 'Whether the user has keyshare on Lumia',
        required: false,
    })
    hasKeyshare?: boolean

    @ApiProperty({
        example: 'Alice',
        required: false,
    })
    displayName?: string | null

    @ApiProperty({
        example: 'https://cdn.lumia.app/avatar/abc123.png',
        required: false,
    })
    avatar?: string | null
}
