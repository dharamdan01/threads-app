import type { CreateUserPayload } from "../../services/user.js";
export declare const resolvers: {
    Queries: {
        getUserToken: (_: any, payload: {
            email: string;
            password: string;
        }) => Promise<string>;
    };
    mutations: {
        createUser: (_: any, payload: CreateUserPayload) => Promise<string>;
    };
};
//# sourceMappingURL=resolvers.d.ts.map