import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { db } from './database';
import './strategies/github-strategy';

db.connection()
    .execute(async (db) => {
        await db.schema.createTable('githubUser')
            .ifNotExists()
            .addColumn('id', 'uuid', (col) => col.primaryKey())
            .addColumn('username', 'varchar(50)', (col) => col.notNull().unique())
            .addColumn('githubID', 'varchar(50)', (col) => col.notNull().unique())
            .execute();
    })
    .then(() => {
        console.log(`Connected to Postgres database`);
    })
    .catch((err) => {
        console.log(`Error connecting to Postgres database: ${err.message}`);
    });
const app = express();

app.use(express.json());
app.use(
    session({
        secret: 'temp_secret',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60 * 24
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/auth/github', passport.authenticate('github'));
app.get(
    '/api/auth/github/redirect', 
    passport.authenticate('github'),
    (request, response) => {
        console.log(request.session);
        console.log(request.user);
        console.log(request.session.id);
        response.redirect('/');
    }
);


export default app;