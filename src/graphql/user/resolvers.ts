import type { CreateUserPayload } from "../../services/user.js";
import UserService from "../../services/user.js";

const Queries = {
    getUserToken: async(_: any, payload: {email: string, password: string}) => {
        const token = await UserService.getUserToken({email: payload.email, password: payload.password});
        return token;
    }
};
const mutations = {

    createUser: async(_: any, payload: CreateUserPayload) => {
        const result = await UserService.createUser(payload);
        return result.id;
    },
};

export const resolvers = {Queries, mutations};