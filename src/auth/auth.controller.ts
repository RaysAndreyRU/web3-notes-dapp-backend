import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import {AuthDataDto} from "./auth-data.dto";
import {UserDto} from "./user.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post('verify-session')
    @ApiOperation({ summary: 'Verify Lumia Passport session token' })
    @ApiResponse({
        status: 200,
        type: UserDto,
    })
    async verifySession(@Body('token') token: string): Promise<UserDto> {
        return this.auth.verifySession(token)
    }
}
