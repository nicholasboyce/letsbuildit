import passport from 'passport';
import { Strategy } from 'passport-github2';
import config from '../utils/config';
import { NewGithubUser } from '../models/GithubUser';

const verifyFunction = (accessToken: string, refreshToken: string, profile: any, done: void) => {
    const newUser : NewGithubUser = {
        username: profile.login,
        githubID: profile.id
    };
    console.log(newUser);
}

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