import passport from 'passport';
import { Strategy, Profile } from 'passport-github2';
import crypto from 'node:crypto';
import config from '../utils/config';
import { NewGithubUser } from '../models/GithubUser';
import * as GithubUserRepository from '../repositories/GithubUserRepository';
import { VerifyCallback, VerifyFunctionWithRequest } from 'passport-oauth2';
import e from 'express';


const verifyFunction : VerifyFunctionWithRequest = async (req: e.Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    console.log('Inside verify function.');
    // console.log(`Profile: ${JSON.stringify(profile)}`);
    console.log(`Access token: ${accessToken}; Refresh token: ${refreshToken}`);
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
        console.log(error);
        return done(error, false);
    }
};

passport.serializeUser((user, done) => {
    console.log('Inside serialize function.');
    return done(null, {
        githubID: user.githubID,
        accessToken: user.accessToken
    });
});

passport.deserializeUser(async (user: any, done) => {
    const id = user.githubID;
    console.log('Inside deserialize function.');
    try {
        const findUser = await GithubUserRepository.findUserByGithubId(id);
        return findUser ? done(null, findUser) : done(null, null);
    } catch (error) {
        console.log(error);
        return done(error, null);
    }
});

passport.use(
    new Strategy(
        {
            clientID: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:7777/api/auth/github/redirect',
            passReqToCallback: true
        },
        verifyFunction
    )
);