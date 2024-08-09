import express from 'express';
import { csrfController } from "../controllers/csrf";
import cors from 'cors';

const csrfRouter = express.Router();

const corsOptions = {
    origin: 'http://localhost:5173'
};

csrfRouter.get('/', cors(corsOptions), csrfController.getToken);

export {
    csrfRouter
};