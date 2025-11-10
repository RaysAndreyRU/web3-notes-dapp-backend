import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { LumiaSessionGuard } from '../auth/lumia-session.guard'
import { User, CurrentUser } from '../auth/current-user'
import {UserDto} from "./ser.dto";

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(LumiaSessionGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('current')
    @ApiOperation({
        summary: 'Get current user',
        description: 'Returns wallet address and metadata for the authenticated user.',
    })
    @ApiOkResponse({ type: UserDto })
    async getCurrent(@User() user: CurrentUser): Promise<UserDto> {
        return this.usersService.getCurrent(user.walletAddress)
    }
}
