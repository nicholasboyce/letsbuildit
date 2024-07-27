import { db } from "../database";
import { GithubUser, NewGithubUser, UpdateGithubUser } from "../models/GithubUser";
import { UUID } from "crypto";

export const createUser = async (user: NewGithubUser) => {
    return await db.insertInto('githubUser')
        .values(user)
        .returningAll()
        .$assertType<GithubUser>()
        .executeTakeFirstOrThrow();
};

export const findUserById = async (id: UUID) => {
    return await db.selectFrom('githubUser')
        .where('id', '=', id)
        .selectAll()
        .$assertType<GithubUser>()
        .executeTakeFirst();
};

export const findUserByGithubId = async (id: any) => {
    return await db.selectFrom('githubUser')
        .where('githubID', '=', id)
        .selectAll()
        .$assertType<GithubUser>()
        .executeTakeFirst();
};

export const deleteAll = async () => {
    await db.deleteFrom('githubUser')
        .execute();
};

export const updateUser = async (id: UUID, user: UpdateGithubUser) => {
    return await db.updateTable('githubUser')
        .set(user)
        .where('id', '=', id)
        .returningAll()
        .$assertType<GithubUser>()
        .executeTakeFirstOrThrow();
};