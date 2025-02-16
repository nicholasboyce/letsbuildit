import { RequestHandler } from "express-serve-static-core";
import { usersService } from "../services/users";
import { RCUser } from "../models/RCUser";


const getCurrentUser : RequestHandler = async (request, response) => {
    const user = await usersService.getCurrentUser(request.user as RCUser, request.session.recurseToken, request.session.githubToken);
    user ? response.json(user) : response.sendStatus(404);
};

const getUser : RequestHandler = async (request, response) => {
    const id = request.params.user;
    const user = await usersService.getUser(id, request.session.recurseToken, request.session.githubToken);
    user ? response.json(user) : response.sendStatus(404);
};

export const usersController = {
    getUser,
    getCurrentUser
};