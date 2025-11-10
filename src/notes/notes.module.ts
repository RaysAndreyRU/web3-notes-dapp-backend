import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { PrismaModule } from 'nestjs-prisma'
import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'
import { NotesRepository } from './notes.repository'
import { LumiaSessionGuard } from '../utils/common/guards/lumia-session.guard'

@Module({
    imports: [PrismaModule],
    controllers: [NotesController],
    providers: [
        NotesService,
        NotesRepository,
        {
            provide: APP_GUARD,
            useClass: LumiaSessionGuard,
        },
    ],
})
export class NotesModule {}
