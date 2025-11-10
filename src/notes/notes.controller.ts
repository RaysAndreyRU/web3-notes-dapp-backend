import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'
import { NotesService } from './notes.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { NoteDto } from './dto/note.dto'
import { User } from "src/utils/common/ decorators/user.decorator"
import {UserDto} from "../auth/user.dto";


@ApiTags('Notes')
@ApiBearerAuth()
@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Get()
    @ApiOperation({
        summary: 'List notes of the current user',
        description: 'Returns all notes created by the authenticated Lumia Passport user.',
    })
    @ApiOkResponse({ type: [NoteDto] })
    async getAll(@User() user: UserDto): Promise<NoteDto[]> {
        return this.notesService.getAll(user.walletAddress)
    }


    @Get(':id')
    @ApiOperation({
        summary: 'Get a specific note by ID',
        description: 'Returns the note if it belongs to the authenticated user.',
    })
    @ApiOkResponse({ type: NoteDto })
    async getOne(
        @Param('id', ParseIntPipe) id: number,
        @User() user: UserDto,
    ): Promise<NoteDto> {
        return this.notesService.getById(user.walletAddress, id)
    }


    @Post()
    @ApiOperation({
        summary: 'Create a new note',
        description: 'Creates a new note linked to the authenticated user.',
    })
    @ApiResponse({ status: 201, type: NoteDto })
    async create(
        @Body() dto: CreateNoteDto,
        @User() user: UserDto,
    ): Promise<NoteDto> {
        return this.notesService.create(user.walletAddress, dto)
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Update an existing note',
        description: 'Updates a note only if it belongs to the authenticated user.',
    })
    @ApiOkResponse({ type: NoteDto })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateNoteDto,
        @User() user: UserDto,
    ): Promise<NoteDto> {
        return this.notesService.update(user.walletAddress, id, dto)
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a note',
        description: 'Deletes a note owned by the authenticated user.',
    })
    @ApiOkResponse({ schema: { example: { success: true } } })
    async remove(
        @Param('id', ParseIntPipe) id: number,
        @User() user: UserDto,
    ): Promise<{ success: boolean }> {
        await this.notesService.delete(user.walletAddress, id)
        return { success: true }
    }
}
