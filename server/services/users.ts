// import { NewGithubUser } from "../models/GithubUser";
// import { GithubUserRepository } from "../repositories/GithubUserRepository";

import { RCUserRepository } from "../repositories/RCUserRepository";

// const getUser = async (user : string) => {
//     const savedUser = await GithubUserRepository.findUserByUsername(user);
//     return savedUser;
// };

const getUser = async (id: string) => {
    const savedUser = await RCUserRepository.findUserByRCId(id);
    return savedUser;
};

// const createUser = async (user : NewGithubUser) => {
//     user.id = crypto.randomUUID();
//     try {
//         const savedUser = await GithubUserRepository.createUser(user);
//         return savedUser;
//     } catch (error) {
//         return null;
//     }
// };

export const usersService = {
    getUser,
    // createUser
};