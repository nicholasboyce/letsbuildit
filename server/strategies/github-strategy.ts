import passport from 'passport';
import { Strategy, Profile } from 'passport-github2';
import crypto from 'node:crypto';
import config from '../utils/config';
import { logger } from '../utils/logger';
import { NewGithubUser } from '../models/GithubUser';
import { GithubUserRepository } from '../repositories/GithubUserRepository';
import { VerifyCallback, VerifyFunctionWithRequest } from 'passport-oauth2';
import e from 'express-serve-static-core';

const verifyFunction : VerifyFunctionWithRequest = async (req: e.Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    // logger.info(`Access token: ${accessToken}; Refresh token: ${refreshToken}`);
    let findUser;
    try {
        findUser = await GithubUserRepository.findUserByGithubId(profile.id);
    } catch (error) {
        return done(error, false);
    }
    try {
        if (!findUser) {
            const newUser : NewGithubUser = {
                id: crypto.randomUUID(),
                username: profile.username || '',
                githubID: profile.id,
            };
            try {
                const savedUser = await GithubUserRepository.createUser(newUser);
                req.session.githubToken = accessToken;
                return done(null, savedUser);
            } catch (error) {
                return done(error, false);
            }
        }
        req.session.githubToken = accessToken;
        return done(null, findUser);
    } catch (error) {
        logger.error(error);
        return done(error, false);
    }
};

passport.serializeUser((user, done) => {
    return done(null, user.githubID);
});

passport.deserializeUser(async (id: any, done) => {
    try {
        const findUser = await GithubUserRepository.findUserByGithubId(id);
        return findUser ? done(null, findUser) : done(null, null);
    } catch (error) {
        logger.error(error);
        return done(error, null);
    }
});

passport.use(
    new Strategy(
        {
            clientID: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET,
            callbackURL: `http://${config.APP_HOST}:${config.PORT}/api/auth/github/redirect`,
            passReqToCallback: true
        },
        verifyFunction
    )
);