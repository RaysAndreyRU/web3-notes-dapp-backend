import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'
import { NotesRepository } from './notes.repository'
import { AuthModule } from '../auth/auth.module'
import {JwtSessionGuard} from "../utils/common/guards/lumia-session.guard";

@Module({
    imports: [
        PrismaModule,
        AuthModule,
    ],
    controllers: [NotesController],
    providers: [
        NotesService,
        NotesRepository,
        JwtSessionGuard,
    ],
})
export class NotesModule {}
