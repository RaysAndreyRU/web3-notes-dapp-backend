import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import {BaseDto} from "../../utils/common/base-entity";

export class CreateNoteDto  extends  BaseDto<CreateNoteDto>{
    @ApiProperty({
        example: 'My first note',
        description: 'Title of the note',
        maxLength: 100,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string

    @ApiProperty({
        example: 'This is the content of my note.',
        description: 'Main text or encrypted content of the note',
    })
    @IsString()
    @IsNotEmpty()
    content: string
}
