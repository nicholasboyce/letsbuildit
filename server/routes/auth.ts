import express from 'express';
import passport from 'passport';
import * as authController from '../controllers/auth';
import '../strategies/github-strategy';

const authRouter = express.Router();

authRouter.get('/github', passport.authenticate('github'));
authRouter.get(
    '/github/redirect', 
    passport.authenticate('github', { keepSessionInfo: true }),
    (_, response) => {
        response.status(200).redirect('/search');
    }
);
authRouter.get('/status', authController.getUserStatus);

export default authRouter;