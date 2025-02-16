import { Router } from 'express';
import { usersController } from '../controllers/users';
import { middleware } from '../utils/middleware';

const usersRouter = Router();

usersRouter.get('/me', middleware.authCheck, usersController.getCurrentUser);
usersRouter.get('/:user', middleware.authCheck, usersController.getUser);


export {
    usersRouter
};