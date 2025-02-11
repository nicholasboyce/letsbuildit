import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
} from 'kysely';

import { UUID } from 'crypto';

export interface RCUserTable {
    id: Generated<UUID>
    username: string
    rcID: string
    rcRefreshToken: string
    githubRefreshToken?: string
    githubID?: string
};

export type RCUser = Selectable<RCUserTable>;
export type NewRCUser = Insertable<RCUserTable>;
export type UpdateRCUser = Updateable<RCUserTable>;