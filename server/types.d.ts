import { UUID } from 'crypto';
import 'express-session';

declare global {
    namespace Express {
        interface User {
            id?: UUID
            githubID?: string
            accessToken?: string
        }
    }
}

declare module 'express-session' {
    interface SessionData {
        refreshToken?: string
        accessToken?: string
        visited?: boolean
    }
}