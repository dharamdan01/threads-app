import JWT from "jsonwebtoken";
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
        firstName: string;
        lastName: string | null;
        email: string;
        password: string;
        salt: string;
        id: string;
        profileImageURL: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    private static getUserByEmail;
    static getUserById(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        firstName: string;
        lastName: string | null;
        email: string;
        password: string;
        salt: string;
        id: string;
        profileImageURL: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    static getUserToken(payload: GetUserTokenPayload): Promise<string>;
    static decodeJWTTOKEN(token: string): string | JWT.JwtPayload;
}
export default UserService;
//# sourceMappingURL=user.d.ts.map