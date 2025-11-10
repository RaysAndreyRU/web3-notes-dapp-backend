import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getRootInfo() {
        return {
            name: 'Web3 Notes DApp Backend',
            version: '1.0.0',
            status: 'running',
        }
    }
}
