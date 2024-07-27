import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const POSTGRESDB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_POSTGRESDB_URI : process.env.POSTGRESDB_URI;
const GITHUB_CLIENT_ID : string = process.env.GITHUB_CLIENT_ID || 'test_id';
const GITHUB_CLIENT_SECRET : string = process.env.GITHUB_CLIENT_SECRET || 'test_secret';
const POSTGRESDB_NAME = process.env.NODE_ENV === 'test' ? 'testDB' : 'devDB';

export default {
    PORT,
    POSTGRESDB_URI,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    POSTGRESDB_NAME
}