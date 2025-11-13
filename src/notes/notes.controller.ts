import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
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
import { UserDto } from '../auth/user.dto'
import { LumiaSessionGuard } from '../utils/common/guards/lumia-session.guard'
import {User} from "../utils/common/ decorators/user.decorator";

@ApiTags('Notes')
@ApiBearerAuth()
@Controller('api/notes')
@UseGuards(LumiaSessionGuard)
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Get()
    @ApiOperation({
        summary: 'List notes of the current user',
        description: 'Returns all notes created by the authenticated Lumia Passport user.',
    })
    @ApiOkResponse({ type: [NoteDto] })
    async getAll(@User() user: UserDto): Promise<NoteDto[]> {
        return this.notesService.getAll(user.id)
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
        return this.notesService.getById(user.id, id)
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
        return this.notesService.create(user.id, dto)
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
        return this.notesService.update(user.id, id, dto)
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
        await this.notesService.delete(user.id, id)
        return { success: true }
    }
}
