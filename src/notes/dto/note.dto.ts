import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsInt, IsString, MaxLength, IsDate } from 'class-validator'
import { BaseDto } from '../../utils/common/base-entity'

export class NoteDto extends BaseDto<NoteDto> {
    @Expose()
    @ApiProperty({ example: 1, description: 'Unique identifier of the note' })
    @IsInt()
    id: number

    @Expose()
    @ApiProperty({ example: 'My first note', description: 'Title of the note' })
    @IsString()
    @MaxLength(255)
    title: string

    @Expose()
    @ApiProperty({
        example: 'This is the content of my note.',
        description: 'Content of the note',
    })
    @IsString()
    content: string

    @Expose()
    @ApiProperty({
        example: '2025-11-09T22:00:00.000Z',
        description: 'Date when the note was created',
    })
    @Type(() => Date)
    @IsDate()
    createdAt: Date

    @Expose()
    @ApiProperty({
        example: '2025-11-09T23:00:00.000Z',
        description: 'Date when the note was last updated',
    })
    @Type(() => Date)
    @IsDate()
    updatedAt: Date
}
