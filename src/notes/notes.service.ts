import { Injectable, NotFoundException } from '@nestjs/common'
import { NotesRepository } from './notes.repository'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { NoteDto } from './dto/note.dto'
import { mapResponse } from '../utils/common/map.response'

@Injectable()
export class NotesService {
    constructor(private readonly repo: NotesRepository) {}


    async getAll(walletAddress: string): Promise<NoteDto[]> {
        const notes = await this.repo.findAllByWallet(walletAddress)
        return notes.map((note) => mapResponse(NoteDto, note))
    }


    async getById(walletAddress: string, id: number): Promise<NoteDto> {
        const note = await this.repo.findOneByIdAndWallet(id, walletAddress)
        if (!note) throw new NotFoundException('Note not found')
        return mapResponse(NoteDto, note)
    }


    async create(walletAddress: string, dto: CreateNoteDto): Promise<NoteDto> {
        const note = await this.repo.createByWallet(walletAddress, dto)
        return mapResponse(NoteDto, note)
    }


    async update(walletAddress: string, id: number, dto: UpdateNoteDto): Promise<NoteDto> {
        const existing = await this.repo.findOneByIdAndWallet(id, walletAddress)
        if (!existing) throw new NotFoundException('Note not found')
        const updated = await this.repo.update(id, dto)
        return mapResponse(NoteDto, updated)
    }


    async delete(walletAddress: string, id: number): Promise<void> {
        const existing = await this.repo.findOneByIdAndWallet(id, walletAddress)
        if (!existing) throw new NotFoundException('Note not found')
        await this.repo.delete(id)
    }
}
