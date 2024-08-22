import express from 'express';
import { csrfSync } from 'csrf-sync';
import { logger } from './utils/logger';
import { usersRouter } from './routes/users';
import { csrfRouter } from './routes/csrf';
import { authRouter } from './routes/auth';

const { csrfSynchronisedProtection } = csrfSync();
const Router = express.Router();

Router.use('/csrf', csrfRouter);
Router.use(csrfSynchronisedProtection);
Router.use('/auth', authRouter);
Router.use('/users', usersRouter);

export { Router };