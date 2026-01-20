export interface CreateUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    salt: string;
}
export interface GetUserTokenPayload {
    email: string;
    password: string;
}
declare class UserService {
    private static generateHash;
    static createUser(payload: CreateUserPayload): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        firstName: string;
        lastName: string | null;
        profileImageURL: string | null;
        email: string;
        password: string;
        salt: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    private static getUserByEmail;
    static getUserToken(payload: GetUserTokenPayload): Promise<string>;
}
export default UserService;
//# sourceMappingURL=user.d.ts.map