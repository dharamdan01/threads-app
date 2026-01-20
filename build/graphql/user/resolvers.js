import UserService from "../../services/user.js";
const Queries = {
    getUserToken: async (_, payload) => {
        const token = await UserService.getUserToken({ email: payload.email, password: payload.password });
        return token;
    }
};
const mutations = {
    createUser: async (_, payload) => {
        const result = await UserService.createUser(payload);
        return result.id;
    },
};
export const resolvers = { Queries, mutations };
//# sourceMappingURL=resolvers.js.map