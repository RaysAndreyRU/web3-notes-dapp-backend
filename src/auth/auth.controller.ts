import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { UserDto } from './user.dto'
import { AuthDataDto } from './auth-data.dto'

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post('verify-session')
    @ApiOperation({ summary: 'Verify Lumia Passport session token' })
    @ApiResponse({ status: 200, type: UserDto })
    async verifySession(@Body() authData: AuthDataDto): Promise<UserDto> {
        console.log('[AuthController] received Lumia authData:', authData)
        return this.auth.verifySession(authData)
    }
}
