import { Injectable, NotFoundException } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { mapResponse } from '../utils/common/map.response'
import {UserDto} from "./ser.dto";

@Injectable()
export class UsersService {
    constructor(private readonly repo: UsersRepository) {}

    async getCurrent(walletAddress: string): Promise<UserDto> {
        const user = await this.repo.findByWalletAddress(walletAddress)
        if (!user) throw new NotFoundException('User not found')
        return mapResponse(UserDto, user)
    }
}
