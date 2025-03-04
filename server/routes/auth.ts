import express from 'express';
import passport from 'passport';
import { authController } from '../controllers/auth';
import config from '../utils/config';
import crypto from 'node:crypto';
// import '../strategies/github-strategy';
import '../strategies/recurse-strategy';
import { z } from "zod";
import { RCUserRepository } from '../repositories/RCUserRepository';

const authRouter = express.Router();
const randomString = crypto.randomBytes(20).toString('hex');

authRouter.get('/recurse', passport.authenticate('recurse'));
authRouter.get(
    '/recurse/redirect', 
    passport.authenticate('recurse', { keepSessionInfo: true }),
    async (_, response) => {
        const params = new URLSearchParams();
        params.append('client_id', config.GITHUB_CLIENT_ID);
        params.append('redirect_uri', 'http://localhost:7777/api/auth/github/callback');
        params.append('state', randomString);
        response.status(200).redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
    }
);

authRouter.get('/github/callback', async (request, response) => {
    const codeParam = request.query.code || '';
    const code = z.string().parse(codeParam);
    const state = request.query.state || '';

    if (state !== randomString) {
        response.status(401).redirect('/error');
    } else {
        const params = new URLSearchParams();
        params.append('client_id', config.GITHUB_CLIENT_ID);
        params.append('client_secret', config.GITHUB_CLIENT_SECRET);
        params.append('code', code);
        const tokenResponse = await fetch(`https://github.com/login/oauth/access_token?${params.toString()}`, {
            method: "POST",
            headers: {
                Accept: "application/json"
            }
        });
        // console.log(tokenResponse);
        const tokens = await tokenResponse.json().catch((e) => console.log(e));
        console.log(tokens);
        request.session.githubToken = tokens.access_token;
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`
            }
        });
        const userInfo = await userResponse.json();
        const savedUser = await RCUserRepository.updateGithubRefreshToken(request.user?.id as crypto.UUID, tokens.refresh_token);
        if (!savedUser.githubID) {
            await RCUserRepository.updateUser(request.user?.id as crypto.UUID, {
                githubID: userInfo.id,
                githubName: userInfo.login
            });
        }
        return response.status(200).redirect('/posts');
    }
});

// authRouter.get('/github', passport.authenticate('github'));
// authRouter.get(
//     '/github/redirect', 
//     passport.authenticate('github', { keepSessionInfo: true }),
//     (_, response) => {
//         response.status(200).redirect('/');
//     }
// );
authRouter.get('/status', authController.getUserStatus);

export {
    authRouter
};