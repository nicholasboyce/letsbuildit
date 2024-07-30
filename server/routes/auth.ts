import express from 'express';
import passport from 'passport';
import '../strategies/github-strategy';

const authRouter = express.Router();

authRouter.get('/github', passport.authenticate('github'));
authRouter.get(
    '/github/redirect', 
    passport.authenticate('github'),
    (request, response) => {
        response.sendStatus(200);
        response.redirect('/');
    }
);
authRouter.get('/status', (request, response) => {
    response.status(200).send(request.user);
});

export default authRouter;