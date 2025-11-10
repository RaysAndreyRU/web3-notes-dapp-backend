import {
    createLumiaPassportCore,
    configureJwtModule,
    createJwtTokenManager,
    MemoryStorage,
} from '@lumiapassport/core'
 const lumiaCore = createLumiaPassportCore({
    tssUrl: process.env.LUMIA_TSS_URL!,
    bundlerUrl: process.env.LUMIA_BUNDLER_URL!,
    tokenStorage: new MemoryStorage(),
    keyshareStorage: new MemoryStorage(),
})

configureJwtModule({
    tssUrl: process.env.LUMIA_TSS_URL!,
})

const jwtStorage = new MemoryStorage()
export const jwtManager = createJwtTokenManager(jwtStorage)
