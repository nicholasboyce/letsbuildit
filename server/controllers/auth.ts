import { RequestHandler } from 'express-serve-static-core';
import { authService } from '../services/auth';

const getUserStatus: RequestHandler = (request, response) => {
    const authenticated = authService.getUserStatus(request.user);
    if (authenticated) {
        console.log(request.session.accessToken);
        response.status(200).send(request.user);
    } else {
        response.status(401).json({error: 'User unauthenticated'});
    }
};

export const authController = {
    getUserStatus
};