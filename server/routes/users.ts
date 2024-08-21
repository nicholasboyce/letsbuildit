import { Router } from 'express';
import { usersController } from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/:user', usersController.getUser);


export {
    usersRouter
};