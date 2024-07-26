import { db } from "../database";
import { GithubUser, NewGithubUser, UpdateGithubUser } from "../models/GithubUser";

export const createUser = async (user: NewGithubUser) => {
    return await db.insertInto('githubUser')
        .values(user)
        .returningAll()
        .$assertType<GithubUser>()
        .executeTakeFirstOrThrow();
};

export const findUserById = async (id: number) => {
    return await db.selectFrom('githubUser')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirstOrThrow();
};

export const deleteAll = async () => {
    await db.deleteFrom('githubUser')
        .execute();
}