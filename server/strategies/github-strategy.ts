import passport from 'passport';
import { Strategy, Profile } from 'passport-github2';
import crypto from 'node:crypto';
import config from '../utils/config';
import logger from '../utils/logger';
import { NewGithubUser } from '../models/GithubUser';
import * as GithubUserRepository from '../repositories/GithubUserRepository';
import { VerifyCallback, VerifyFunction } from 'passport-oauth2';


const verifyFunction : VerifyFunction = async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    logger.info('Inside verify function.');
    logger.info(`Access token: ${accessToken}; Refresh token: ${refreshToken}`);
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
            const savedUser = await GithubUserRepository.createUser(newUser);
            return done(null, {...savedUser, accessToken});
        }
        return done(null, {...findUser, accessToken});
    } catch (error) {
        logger.error(error);
        return done(error, false);
    }
};

passport.serializeUser((user, done) => {
    logger.info('Inside serialize function.');
    return done(null, {
        githubID: user.githubID,
        accessToken: user.accessToken
    });
});

passport.deserializeUser(async (user: any, done) => {
    const id = user.githubID;
    logger.info('Inside deserialize function.');
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
            callbackURL: `http://${config.APP_HOST}:${config.PORT}/api/auth/github/redirect`
        },
        verifyFunction
    )
);