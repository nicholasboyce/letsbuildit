import { GithubUserRepository } from "../repositories/GithubUserRepository";

const getUser = async (user : string) => {
    const savedUser = await GithubUserRepository.findUserByUsername(user);
    return savedUser;
};


export const usersService = {
    getUser
};