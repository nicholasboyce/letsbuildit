import { RequestHandler } from "express-serve-static-core";
import { usersService } from "../services/users";


const getCurrentUser : RequestHandler = async (request, response) => {
    const currentUsername = request.user;
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