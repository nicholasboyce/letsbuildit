import { csrfSync } from 'csrf-sync';
import { RequestHandler } from 'express-serve-static-core';
const {
    generateToken
} = csrfSync();

const getToken: RequestHandler = (request, response) => {
    response.json({ token: generateToken(request) });
}

const csrfController = {
    getToken
};

export default csrfController;