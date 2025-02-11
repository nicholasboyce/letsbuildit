import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const POSTGRESDB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_POSTGRESDB_URI : process.env.POSTGRESDB_URI;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'test_id';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || 'test_secret';
const POSTGRESDB_NAME = process.env.NODE_ENV === 'test' ? 'testDB' : process.env.POSTGRESDB_NAME;
const POSTGRESDB_HOST = process.env.NODE_ENV === 'test' ? 'localhost' : process.env.POSTGRESDB_HOST;
const POSTGRESDB_USER = process.env.NODE_ENV === 'test' ? 'root' : process.env.POSTGRESDB_USER;
const SESSION_SECRET = process.env.SESSION_SECRET || 'iloveyou';
const POSTGRESDB_PORT = process.env.NODE_ENV === 'test' ? 5434 : Number(process.env.POSTGRESDB_PORT);
const POSTGRESDB_PASSWORD = process.env.NODE_ENV === 'test' ? 'password' : process.env.POSTGRESDB_PASSWORD;
const APP_HOST = process.env.APP_HOST;
const RECURSE_CLIENT_ID = process.env.RECURSE_CLIENT_ID || 'rc_test_id';
const RECURSE_CLIENT_SECRET = process.env.RECURSE_CLIENT_SECRET || 'rc_test_secret';


export default {
    PORT,
    POSTGRESDB_URI,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    POSTGRESDB_NAME,
    POSTGRESDB_HOST,
    POSTGRESDB_USER,
    POSTGRESDB_PORT,
    POSTGRESDB_PASSWORD,
    SESSION_SECRET,
    APP_HOST,
    RECURSE_CLIENT_ID,
    RECURSE_CLIENT_SECRET
}