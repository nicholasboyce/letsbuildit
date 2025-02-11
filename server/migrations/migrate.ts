import { Kysely, sql } from "kysely";

export const up = async (db: Kysely<any>): Promise<void> => {
    await db.schema.createTable('rc_user')
        .ifNotExists()
        .addColumn('id', 'uuid', (col) => col.primaryKey())
        .addColumn('name', 'varchar(50)', (col) => col.notNull().unique())
        .addColumn('rcID', 'varchar(50)', (col) => col.notNull().unique())
        .addColumn('rcRefreshToken', 'varchar(50)', (col) => col.notNull().unique())
        .addColumn('githubID', 'varchar(50)', (col) => col.unique())
        .addColumn('githubRefreshToken', 'varchar(100)', (col) => col.unique())
        .execute();
};

export const down = async (db: Kysely<any>): Promise<void> => {
    await db.schema.dropTable('rc_user').execute();
};