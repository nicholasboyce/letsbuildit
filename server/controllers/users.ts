import { RequestHandler } from "express-serve-static-core";
import { usersService } from "../services/users";
import { z } from "zod";

const userResponseSchema = z
    .object({
        username: z.string(),
        githubID: z.string()
    })
    .required();

interface userResponse extends z.infer<typeof userResponseSchema>{};


const getUser : RequestHandler = async (request, response) => {
    const username = request.params.user;
    const user = await usersService.getUser(username);
    if (user) {
        const valid = userResponseSchema.safeParse(user);
        valid.success ? response.status(200).json(valid.data) : response.sendStatus(404);
    } else {
        response.sendStatus(404);
    }
};


export const usersController = {
    getUser
};