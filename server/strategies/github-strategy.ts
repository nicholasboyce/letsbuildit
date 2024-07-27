import passport from 'passport';
import { Strategy, Profile } from 'passport-github2';
import crypto from 'node:crypto';
import config from '../utils/config';
import { NewGithubUser } from '../models/GithubUser';
import * as GithubUserRepository from '../repositories/GithubUserRepository';
import { VerifyCallback } from 'passport-oauth2';

const verifyFunction = async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
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
            return done(null, savedUser);
        }
        return done(null, findUser);
    } catch (error) {
        console.log(error);
        return done(error, false);
    }
};

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.githubID);
});

passport.deserializeUser(async (id, done) => {
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
        },
        verifyFunction
    )
);