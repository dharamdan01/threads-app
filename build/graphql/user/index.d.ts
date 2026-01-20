export declare const User: {
    typeDefs: string;
    Queries: string;
    mutation: string;
    resolvers: {
        Queries: {
            getUserToken: (_: any, payload: {
                email: string;
                password: string;
            }) => Promise<string>;
        };
        mutations: {
            createUser: (_: any, payload: import("../../services/user.js").CreateUserPayload) => Promise<string>;
        };
    };
};
//# sourceMappingURL=index.d.ts.map