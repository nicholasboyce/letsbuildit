import { Database } from './models/database'; // this is the Database interface we defined earlier
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import config from './utils/config';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: config.POSTGRESDB_NAME,
    host: config.POSTGRESDB_HOST,
    user: config.POSTGRESDB_USER,
    port: config.POSTGRESDB_PORT,
    max: 10,
    password: config.POSTGRESDB_PASSWORD
  })
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});