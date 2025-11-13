import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'
import { NotesRepository } from './notes.repository'

@Module({
    imports: [PrismaModule],
    controllers: [NotesController],
    providers: [
        NotesService,
        NotesRepository,
    ],
})
export class NotesModule {}
