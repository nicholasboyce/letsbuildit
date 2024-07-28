import { db } from "../database";
import { GithubUser, NewGithubUser, UpdateGithubUser } from "../models/GithubUser";
import { UUID } from "crypto";

/** Creates GithubUserTable. */
export const createGithubUserTable = async () => {
    await db.schema.createTable('githubUser')
        .ifNotExists()
        .addColumn('id', 'uuid', (col) => col.primaryKey())
        .addColumn('username', 'varchar(50)', (col) => col.notNull().unique())
        .addColumn('githubID', 'varchar(50)', (col) => col.notNull().unique())
        .execute();
};

/** Inserts NewGithubUser into githubUser table and returns the inserted GithubUser. Throws an error if this process fails.  */
export const createUser = async (user: NewGithubUser) : Promise<GithubUser> => {
    return await db.insertInto('githubUser')
        .values(user)
        .returningAll()
        .$assertType<GithubUser>()
        .executeTakeFirstOrThrow();
};

/** Searches database for GithubUser by UUID generated on the server and returns the user or undefined if not found. */
export const findUserById = async (id: UUID) => {
    return await db.selectFrom('githubUser')
        .where('id', '=', id)
        .selectAll()
        .$assertType<GithubUser>()
        .executeTakeFirst();
};

/** Searches database for GithubUser by Github ID and returns the user or undefined if not found. */
export const findUserByGithubId = async (id: string) => {
    return await db.selectFrom('githubUser')
        .where('githubID', '=', id)
        .selectAll()
        .$assertType<GithubUser>()
        .executeTakeFirst();
};

/** Deletes all rows from githubUser table. */
export const deleteAll = async () => {
    await db.deleteFrom('githubUser')
        .execute();
};

/** Identifies and updates GithubUser with corresponding UUID in database with new user data provided. Returns the updated GithubUser, and throws an error if this process fails. */
export const updateUser = async (id: UUID, user: UpdateGithubUser) => {
    return await db.updateTable('githubUser')
        .set(user)
        .where('id', '=', id)
        .returningAll()
        .$assertType<GithubUser>()
        .executeTakeFirstOrThrow();
};