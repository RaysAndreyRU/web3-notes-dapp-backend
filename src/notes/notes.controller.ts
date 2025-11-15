import {
    Body,
    Controller, DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put, Query,
    UseGuards,
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation, ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'
import { NotesService } from './notes.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { NoteDto } from './dto/note.dto'
import { UserDto } from '../auth/  dto/user.dto'
import {User} from "../utils/common/ decorators/user.decorator";
import {JwtSessionGuard} from "../utils/common/guards/lumia-session.guard";
import {PagedNotesDto} from "./dto/paged-notes.dto";

@ApiTags('Notes')
@ApiBearerAuth()
@Controller('api/notes')
@UseGuards(JwtSessionGuard)
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Get()
    @ApiOperation({
        summary: 'List notes of the current user',
        description:
            'Returns paginated notes created by the authenticated Lumia Passport user.',
    })
    @ApiQuery({ name: 'skip', required: false, type: Number, example: 0 })
    @ApiQuery({ name: 'take', required: false, type: Number, example: 10 })
    @ApiOkResponse({ type: PagedNotesDto })
    async getAll(
        @User() user: UserDto,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    ): Promise<PagedNotesDto> {
        return this.notesService.getAll(user.id, skip, take)
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
