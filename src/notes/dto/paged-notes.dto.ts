import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { NoteDto } from './note.dto'
import {BaseDto} from "../../utils/common/base-entity";

export class PagedNotesDto extends  BaseDto<PagedNotesDto>{
    @ApiProperty({ type: [NoteDto] })
    @Type(() => NoteDto)
    items: NoteDto[]

    @ApiProperty({ example: 42, description: 'Total notes for current user' })
    total: number

    @ApiProperty({ example: 0, description: 'Number of skipped records' })
    skip: number

    @ApiProperty({ example: 10, description: 'Number of records taken' })
    take: number
}
