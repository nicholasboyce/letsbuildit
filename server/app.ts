import express from 'express';
import 'express-async-errors';
import session from 'express-session';
import passport from 'passport';
import { db } from './database';
import { logger } from './utils/logger';
import { middleware } from './utils/middleware';
import { Router } from './router';
import config from './utils/config';
import { migrateToLatest } from './utils/migration';


db.connection()
    .execute(async (db) => {
        await migrateToLatest();
    })
    .then(() => {
        logger.info(`Connected to Postgres database`);
    })
    .catch((err) => {
        logger.error(`Error connecting to Postgres database: ${err}`);
    });


const app = express();

app.use(express.json());
app.use(
    session({
        secret: config.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60 * 2
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dist/client'));
app.use(middleware.requestLogger);

app.use('/api', Router);
app.get('(/*)?', async (_, res, next) => {
    res.sendFile('dist/client/index.html', { root: __dirname });
});


export default app;