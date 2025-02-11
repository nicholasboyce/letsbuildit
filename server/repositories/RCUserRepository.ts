import { db } from "../database";
import { RCUser, NewRCUser, UpdateRCUser } from "../models/RCUser";
import { UUID } from "crypto";

/** Creates RCUserTable. */
const createRCUserTable = async () => {
    await db.schema.createTable('rc_user')
        .ifNotExists()
        .addColumn('id', 'uuid', (col) => col.primaryKey())
        .addColumn('name', 'varchar(50)', (col) => col.notNull().unique())
        .addColumn('rcID', 'varchar(50)', (col) => col.notNull().unique())
        .execute();
};

/** Inserts NewRCUser into RCUser table and returns the inserted RCUser. Throws an error if this process fails.  */
const createUser = async (user: NewRCUser) : Promise<RCUser> => {
    return await db.insertInto('rc_user')
        .values(user)
        .returningAll()
        .$assertType<RCUser>()
        .executeTakeFirstOrThrow();
};

/** Searches database for RCUser by UUID generated on the server and returns the user or undefined if not found. */
const findUserById = async (id: UUID) : Promise<RCUser | undefined> => {
    return await db.selectFrom('rc_user')
        .where('id', '=', id)
        .selectAll()
        .$assertType<RCUser>()
        .executeTakeFirst();
};

/** Searches database for RCUser by RC ID and returns the user or undefined if not found. */
const findUserByRCId = async (id: string) : Promise<RCUser | undefined> => {
    return await db.selectFrom('rc_user')
        .where('rcID', '=', id)
        .selectAll()
        .$assertType<RCUser>()
        .executeTakeFirst();
};

/** Searches database for GithubUser by Github ID and returns the user or undefined if not found. */
const findUserByGithubId = async (id: string) : Promise<RCUser | undefined> => {
    return await db.selectFrom('rc_user')
        .where('githubID', '=', id)
        .selectAll()
        .$assertType<RCUser>()
        .executeTakeFirst();
};

/** Searches database for RCUser by name and returns the user or undefined if not found. */
const findUserByName = async (name: string) : Promise<RCUser | undefined> => {
    return await db.selectFrom('rc_user')
        .where('name', '=', name)
        .selectAll()
        .$assertType<RCUser>()
        .executeTakeFirst();
};

/** Deletes all rows from RCUser table. */
const deleteAll = async () => {
    await db.deleteFrom('rc_user')
        .execute();
};

/** Identifies and updates RCUser with corresponding UUID in database with new user data provided. Returns the updated RCUser, and throws an error if this process fails. */
const updateUser = async (id: UUID, user: UpdateRCUser) : Promise<RCUser> => {
    return await db.updateTable('rc_user')
        .set(user)
        .where('id', '=', id)
        .returningAll()
        .$assertType<RCUser>()
        .executeTakeFirstOrThrow();
};

const updateRCRefreshToken = async (id: UUID, token: string) : Promise<RCUser> => {
    return await db.updateTable('rc_user')
        .set({rcRefreshToken: token})
        .where('id', '=', id)
        .returningAll()
        .$assertType<RCUser>()
        .executeTakeFirstOrThrow();
};

const updateGithubRefreshToken = async (id: UUID, token: string) : Promise<RCUser> => {
    return await db.updateTable('rc_user')
        .set({githubRefreshToken: token})
        .where('id', '=', id)
        .returningAll()
        .$assertType<RCUser>()
        .executeTakeFirstOrThrow();
};

export const RCUserRepository = {
    createRCUserTable,
    createUser,
    findUserByRCId,
    findUserById,
    findUserByGithubId,
    findUserByName,
    deleteAll,
    updateUser,
    updateGithubRefreshToken,
    updateRCRefreshToken
};