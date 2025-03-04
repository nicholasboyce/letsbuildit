import { logger } from "./logger";
import { RequestHandler } from "express-serve-static-core";

const requestLogger : RequestHandler = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('Session ID: ', request.session.id)
    logger.info('---')
    next()
};

const authCheck : RequestHandler = (request, response, next) => {
    if (!request.user) {
        return response.sendStatus(404);
    }
    next();
}

export const middleware = {
    requestLogger,
    authCheck
};