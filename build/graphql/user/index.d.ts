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
            getCurrentLoggedInUser: (_: any, paramaters: any, context: any) => Promise<{
                firstName: string;
                lastName: string | null;
                email: string;
                password: string;
                salt: string;
                id: string;
                profileImageURL: string | null;
            } | null>;
        };
        mutations: {
            createUser: (_: any, payload: import("../../services/user.js").CreateUserPayload) => Promise<string>;
        };
    };
};
//# sourceMappingURL=index.d.ts.map