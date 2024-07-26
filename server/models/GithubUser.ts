import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
} from 'kysely';

import { UUID } from 'crypto';

export interface GithubUserTable {
    id: Generated<UUID>
    username: string
    githubID: number
};

export type GithubUser = Selectable<GithubUserTable>;
export type NewGithubUser = Insertable<GithubUserTable>;
export type UpdateGithubUser = Updateable<GithubUserTable>;