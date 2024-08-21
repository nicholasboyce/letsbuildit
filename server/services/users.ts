import { NewGithubUser } from "../models/GithubUser";
import { GithubUserRepository } from "../repositories/GithubUserRepository";

const getUser = async (user : string) => {
    const savedUser = await GithubUserRepository.findUserByUsername(user);
    return savedUser;
};

const createUser = async (user : NewGithubUser) => {
    user.id = crypto.randomUUID();
    try {
        const savedUser = await GithubUserRepository.createUser(user);
        return savedUser;
    } catch (error) {
        return null;
    }
};

export const usersService = {
    getUser,
    createUser
};