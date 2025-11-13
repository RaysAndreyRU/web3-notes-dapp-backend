import { ApiProperty } from '@nestjs/swagger'
import {Expose, Type} from 'class-transformer'
import { IsInt, IsString, IsDate } from 'class-validator'
import { BaseDto } from '../utils/common/base-entity'

export class UserDto extends BaseDto<UserDto> {
    @Expose()
    @IsInt()
    @ApiProperty({ example: 1, description: 'Unique user ID' })
    id: number

    @Expose()
    @IsString()
    @ApiProperty({
        example: '0x1234567890abcdef1234567890abcdef12345678',
        description: 'User wallet address',
    })
    walletAddress: string

    @Expose()
    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        example: '2025-11-10T00:00:00.000Z',
        description: 'Date when user was created',
    })
    createdAt: Date
}
