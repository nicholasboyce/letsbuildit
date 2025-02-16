import { RequestHandler } from "express-serve-static-core";
import { usersService } from "../services/users";
import { z } from "zod";
import { recurse } from "../utils/recurse";

const userPostResponseSchema = z.object({
    user: z.object({
        zulip_id: z.number(),
        image_path: z.string().url(),
        name: z.string(),
        pronouns: z.string()
    }),
    posts: z.array(
        z.object({
            html_url: z.string().url(),
            name: z.string(),
            full_name: z.string(),
            description: z.string(),
            created_at: z.date(),
            updated_at: z.date(),
            main_language: z.string(),
            languages: z.array(z.string())
        })
    )
});

interface userPostResponse extends z.infer<typeof userPostResponseSchema>{};

const dbResponseSchema = z
    .object({
        username: z.string(),
        githubID: z.string()
    })
    .required();

interface dbResponse extends z.infer<typeof dbResponseSchema>{};

const ghResponseSchema = z.object({
    html_url: z.string().url(),
    name: z.string(),
    full_name: z.string(),
    description: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    main_language: z.string(),
    languages: z.array(z.string())
}).array();

interface ghResponse extends z.infer<typeof ghResponseSchema>{};

const getCurrentUser : RequestHandler = async (request, response) => {
    const currentUsername = request.user;
};

const getUser : RequestHandler = async (request, response) => {
    const id = request.params.user;
    const user = await usersService.getUser(id);
    if (!user) {
        return response.sendStatus(404);
    }
    const valid = dbResponseSchema.safeParse(user);
    if (!valid.success) {
        return response.sendStatus(404);
    }
    const rcResponse = await recurse.getUserInfo(user.rcID, request.session.recurseToken);
    const ghResponse = await github.getUserPosts(user.githubID, request.session.githubToken);

    if (rcResponse.success && ghResponse.success) {
        const userInfoRaw = {
            user: rcResponse.data,
            posts: ghResponse.data
        };
        const userInfo = userPostResponseSchema.safeParse(userInfoRaw);
        if (userInfo.success) {
            return response.json(userInfo.data);
        }
        return response.sendStatus(404);
    }
    return response.sendStatus(404);
};

export const usersController = {
    getUser,
    getCurrentUser
};