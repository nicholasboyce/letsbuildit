import { Router } from 'express';
import { usersController } from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/me', usersController.getCurrentUser);
usersRouter.get('/:user', usersController.getUser);


export {
    usersRouter
};