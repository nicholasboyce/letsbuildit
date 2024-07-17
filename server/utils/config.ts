import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const POSTGRESDB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_POSTGRESDB_URI : process.env.POSTGRESDB_URI;

export default {
    PORT,
    POSTGRESDB_URI
}