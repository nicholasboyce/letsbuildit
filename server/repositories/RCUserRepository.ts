import { db } from "../database";
import { RCUser, NewRCUser, UpdateRCUser } from "../models/RCUser";
import { UUID } from "crypto";

/** Creates RCUserTable. */
const createRCUserTable = async () => {
    await db.schema.createTable('rcUser')
        .ifNotExists()
        .addColumn('id', 'uuid', (col) => col.primaryKey())
        .addColumn('username', 'varchar(50)', (col) => col.notNull().unique())
        .addColumn('rcID', 'varchar(50)', (col) => col.notNull().unique())
        .execute();
};

/** Inserts NewRCUser into RCUser table and returns the inserted RCUser. Throws an error if this process fails.  */
const createUser = async (user: NewRCUser) : Promise<RCUser> => {
    return await db.insertInto('rcUser')
        .values(user)
        .returningAll()
        .$assertType<RCUser>()
        .executeTakeFirstOrThrow();
};

/** Searches database for RCUser by UUID generated on the server and returns the user or undefined if not found. */
const findUserById = async (id: UUID) : Promise<RCUser | undefined> => {
    return await db.selectFrom('rcUser')
        .where('id', '=', id)
        .selectAll()
        .$assertType<RCUser>()
        .executeTakeFirst();
};

/** Searches database for RCUser by RC ID and returns the user or undefined if not found. */
const findUserByRCId = async (id: string) : Promise<RCUser | undefined> => {
    return await db.selectFrom('rcUser')
        .where('rcID', '=', id)
        .selectAll()
        .$assertType<RCUser>()
        .executeTakeFirst();
};

/** Searches database for RCUser by username and returns the user or undefined if not found. */
const findUserByUsername = async (username: string) : Promise<RCUser | undefined> => {
    return await db.selectFrom('rcUser')
        .where('username', '=', username)
        .selectAll()
        .$assertType<RCUser>()
        .executeTakeFirst();
};

/** Deletes all rows from RCUser table. */
const deleteAll = async () => {
    await db.deleteFrom('rcUser')
        .execute();
};

/** Identifies and updates RCUser with corresponding UUID in database with new user data provided. Returns the updated RCUser, and throws an error if this process fails. */
const updateUser = async (id: UUID, user: UpdateRCUser) : Promise<RCUser> => {
    return await db.updateTable('rcUser')
        .set(user)
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
    findUserByUsername,
    deleteAll,
    updateUser
};