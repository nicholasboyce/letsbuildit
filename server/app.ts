import express from 'express';
import session from 'express-session';
import passport from 'passport';


const app = express();

app.use(express.json());
app.use(
    session({
        secret: 'temp_secret',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60 * 24
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());


export default app;