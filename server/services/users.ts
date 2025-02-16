// import { NewGithubUser } from "../models/GithubUser";
// import { GithubUserRepository } from "../repositories/GithubUserRepository";
import { z } from "zod";
import { RCUserRepository } from "../repositories/RCUserRepository";
import { recurse } from "../utils/recurse";
import { github } from "../utils/github";
import { RCUser } from "../models/RCUser";

const dbResponseSchema = z
    .object({
        id: z.string(),
        name: z.string(),
        rcID: z.string(),
        rcRefreshToken: z.string(),
        githubRefreshToken: z.string(),
        githubID: z.string(),
        githubName: z.string()
    })
    .required();

interface dbResponse extends z.infer<typeof dbResponseSchema>{};

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

const getUser = async (id: string, recurseToken: string | undefined, githubToken: string | undefined) => {
    const savedUser = await RCUserRepository.findUserByRCId(id);
    if (!savedUser) {
        return null;
    }
    const valid = dbResponseSchema.safeParse(savedUser);
    if (!valid.success) {
        return null;
    }
    const user = valid.data;
    const rcResponse = await recurse.getUserInfo(user.rcID, recurseToken);
    const ghResponse = await github.getUserPosts(user.githubName, githubToken);

    if (rcResponse.success && ghResponse.success) {
        const userInfoRaw = {
            user: rcResponse.data,
            posts: ghResponse.data
        };
        const userInfo = userPostResponseSchema.safeParse(userInfoRaw);
        if (userInfo.success) {
            return userInfo.data;
        }
        return null;
    }
    return null;
};

const getCurrentUser = async (savedUser: RCUser, recurseToken: string | undefined, githubToken: string | undefined) => {
    const valid = dbResponseSchema.safeParse(savedUser);
    if (!valid.success) {
        return null;
    }
    const user = valid.data;
    const rcResponse = await recurse.getCurrentUserInfo(recurseToken);
    const ghResponse = await github.getUserPosts(user.githubName, githubToken);

    if (rcResponse.success && ghResponse.success) {
        const userInfoRaw = {
            user: rcResponse.data,
            posts: ghResponse.data
        };
        const userInfo = userPostResponseSchema.safeParse(userInfoRaw);
        if (userInfo.success) {
            return userInfo.data;
        }
        return null;
    }
    return null;
};

export const usersService = {
    getUser,
    getCurrentUser
};