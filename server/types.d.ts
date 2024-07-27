import { UUID } from 'crypto';

declare global {
    namespace Express {
        interface User {
            id?: UUID
            githubID?: string
        }
    }
}