import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {BaseDto} from "../../utils/common/base-entity";

export class NoteDto   extends  BaseDto<NoteDto>{
    @Expose()
    @ApiProperty({ example: 1, description: 'Unique identifier of the note' })
    id: number

    @Expose()
    @ApiProperty({ example: 'My first note', description: 'Title of the note' })
    title: string

    @Expose()
    @ApiProperty({ example: 'This is the content of my note.', description: 'Content of the note' })
    content: string

    @Expose()
    @ApiProperty({ example: '2025-11-09T22:00:00.000Z', description: 'Date when the note was created' })
    createdAt: Date

    @Expose()
    @ApiProperty({ example: '2025-11-09T23:00:00.000Z', description: 'Date when the note was last updated' })
    updatedAt: Date
}
