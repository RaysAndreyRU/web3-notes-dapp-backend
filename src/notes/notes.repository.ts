import { Injectable } from '@nestjs/common'
import { Prisma, Note } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { BaseRepository } from '../utils/common/base.repository'
import { CreateNoteDto } from './dto/create-note.dto'

@Injectable()
export class NotesRepository extends BaseRepository<
    Note,
    Prisma.NoteCreateInput,
    Prisma.NoteUpdateInput
> {
    constructor(prisma: PrismaService) {
        super(prisma as any, 'note')
    }

    findAllByUser(userId: string) {
        return this.repo.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        })
    }

    findOneByIdAndUser(id: number, userId: string) {
        return this.repo.findFirst({
            where: { id, userId },
        })
    }

    async createByUser(userId: string, dto: CreateNoteDto) {
        return this.repo.create({
            data: {
                title: dto.title,
                content: dto.content,
                user: {
                    connect: { id: userId },
                },
            },
        })
    }
}
