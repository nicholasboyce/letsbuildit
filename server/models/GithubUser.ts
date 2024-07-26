import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
} from 'kysely';

export interface GithubUserTable {
    id: Generated<number>
    username: string
    githubID: number
};

export type GithubUser = Selectable<GithubUserTable>;
export type NewGithubUser = Insertable<GithubUserTable>;
export type UpdateGithubUser = Updateable<GithubUserTable>;