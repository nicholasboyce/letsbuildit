
export const getUserStatus = (agent: Express.User | undefined) : boolean => {
    return agent ? true : false;
};

export const authService = {
    getUserStatus
}