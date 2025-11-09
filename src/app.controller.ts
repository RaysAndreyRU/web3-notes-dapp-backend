import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('Common')
export class AppController {
    @Get()
    @ApiOperation({
        summary: 'Root endpoint',
        description: 'Returns basic information about the Web3 Notes DApp backend.',
    })
    @ApiOkResponse({
        description: 'Basic backend info.',
        schema: {
            type: 'object',
            example: {
                name: 'Web3 Notes DApp Backend',
                version: '1.0.0',
                status: 'running',
            },
        },
    })
    getRoot(): Record<string, string> {
        return {
            name: 'Web3 Notes DApp Backend',
            version: '1.0.0',
            status: 'running',
        }
    }
}
