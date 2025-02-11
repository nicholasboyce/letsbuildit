import { UUID } from 'crypto';
import 'express-session';

declare global {
    namespace Express {
        interface User {
            id?: UUID
            githubID?: string
            rcID?: string
        }
    }
}

declare module 'express-session' {
    interface SessionData {
        recurseToken?: string
        githubToken?: string
        visited?: boolean
    }
}