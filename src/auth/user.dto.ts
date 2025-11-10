import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {BaseDto} from "../utils/common/base-entity";

export class UserDto  extends BaseDto<UserDto> {
    @Expose()
    @ApiProperty({ example: 1, description: 'Unique user ID' })
    id: number

    @Expose()
    @ApiProperty({ example: '0x1234567890abcdef1234567890abcdef12345678', description: 'User wallet address' })
    walletAddress: string

    @Expose()
    @ApiProperty({ example: '2025-11-10T00:00:00.000Z', description: 'Date when user was created' })
    createdAt: Date
}
