import passport from "passport";
import OAuth2Strategy from "passport-oauth2";
import crypto from 'node:crypto';
import config from '../utils/config';
import { logger } from '../utils/logger';
import { VerifyCallback, VerifyFunctionWithRequest } from 'passport-oauth2';
import e from 'express-serve-static-core';

const verifyFunction : VerifyFunctionWithRequest = async (req: e.Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
    // logger.info(`Access token: ${accessToken}; Refresh token: ${refreshToken}`);
    let findUser;
    try {
        findUser = await RCUserRepository.findUserByRCId(profile.id);
    } catch (error) {
        return done(error, false);
    }
    try {
        if (!findUser) {
            const newUser : NewRCUser = {
                id: crypto.randomUUID(),
                username: profile.username || '',
                recurseID: profile.id,
            };
            try {
                const savedUser = await RCUserRepository.createUser(newUser);
                req.session.accessToken = accessToken;
                return done(null, savedUser);
            } catch (error) {
                return done(error, false);
            }
        }
        req.session.accessToken = accessToken;
        return done(null, findUser);
    } catch (error) {
        logger.error(error);
        return done(error, false);
    }
};

passport.serializeUser((user, done) => {
    return done(null, user.recurseID);
});

passport.deserializeUser(async (id: any, done) => {
    try {
        const findUser = await RCUserRepository.findUserByRCId(id);
        return findUser ? done(null, findUser) : done(null, null);
    } catch (error) {
        logger.error(error);
        return done(error, null);
    }
});

passport.use('recurse', new OAuth2Strategy({
        authorizationURL: 'https://www.recurse.com/oauth/authorize',
        tokenURL: 'https://www.recurse.com/oauth/token',
        clientID: config.RECURSE_CLIENT_ID,
        clientSecret: config.RECURSE_CLIENT_SECRET,
        callbackURL: `http://${config.APP_HOST}:${config.PORT}/api/auth/github/redirect`,
        passReqToCallback: true
    },
    verifyFunction
));