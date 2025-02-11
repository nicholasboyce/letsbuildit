// import { db } from "../database";
// import { GithubUser, NewGithubUser, UpdateGithubUser } from "../models/GithubUser";
// import { UUID } from "crypto";

// /** Creates GithubUserTable. */
// const createGithubUserTable = async () => {
//     await db.schema.createTable('githubUser')
//         .ifNotExists()
//         .addColumn('id', 'uuid', (col) => col.primaryKey())
//         .addColumn('username', 'varchar(50)', (col) => col.notNull().unique())
//         .addColumn('githubID', 'varchar(50)', (col) => col.notNull().unique())
//         .execute();
// };

// /** Inserts NewGithubUser into githubUser table and returns the inserted GithubUser. Throws an error if this process fails.  */
// const createUser = async (user: NewGithubUser) : Promise<GithubUser> => {
//     return await db.insertInto('githubUser')
//         .values(user)
//         .returningAll()
//         .$assertType<GithubUser>()
//         .executeTakeFirstOrThrow();
// };

// /** Searches database for GithubUser by UUID generated on the server and returns the user or undefined if not found. */
// const findUserById = async (id: UUID) : Promise<GithubUser | undefined> => {
//     return await db.selectFrom('githubUser')
//         .where('id', '=', id)
//         .selectAll()
//         .$assertType<GithubUser>()
//         .executeTakeFirst();
// };

// /** Searches database for GithubUser by Github ID and returns the user or undefined if not found. */
// const findUserByGithubId = async (id: string) : Promise<GithubUser | undefined> => {
//     return await db.selectFrom('githubUser')
//         .where('githubID', '=', id)
//         .selectAll()
//         .$assertType<GithubUser>()
//         .executeTakeFirst();
// };

// /** Searches database for GithubUser by username and returns the user or undefined if not found. */
// const findUserByUsername = async (username: string) : Promise<GithubUser | undefined> => {
//     return await db.selectFrom('githubUser')
//         .where('username', '=', username)
//         .selectAll()
//         .$assertType<GithubUser>()
//         .executeTakeFirst();
// };

// /** Deletes all rows from githubUser table. */
// const deleteAll = async () => {
//     await db.deleteFrom('githubUser')
//         .execute();
// };

// /** Identifies and updates GithubUser with corresponding UUID in database with new user data provided. Returns the updated GithubUser, and throws an error if this process fails. */
// const updateUser = async (id: UUID, user: UpdateGithubUser) : Promise<GithubUser> => {
//     return await db.updateTable('githubUser')
//         .set(user)
//         .where('id', '=', id)
//         .returningAll()
//         .$assertType<GithubUser>()
//         .executeTakeFirstOrThrow();
// };

// export const GithubUserRepository = {
//     createGithubUserTable,
//     createUser,
//     findUserByGithubId,
//     findUserById,
//     findUserByUsername,
//     deleteAll,
//     updateUser
// };