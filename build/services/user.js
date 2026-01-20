import { prismaClient } from "../lib/db.js";
import JWT from "jsonwebtoken";
import { createHmac, randomBytes } from "node:crypto";
const JWT_SECRET = "$uperm@an";
class UserService {
    static generateHash(salt, password) {
        const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");
        return hashedPassword;
    }
    static createUser(payload) {
        let { firstName, lastName, email, password, salt } = payload;
        salt = randomBytes(32).toString('hex');
        const hashedPassword = UserService.generateHash(salt, password);
        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword,
            },
        });
    }
    static getUserByEmail(email) {
        return prismaClient.user.findUnique({ where: { email } });
    }
    static async getUserToken(payload) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);
        if (!user)
            throw new Error('user not found');
        const salt = user.salt;
        const userHashedPassword = UserService.generateHash(salt, password);
        if (userHashedPassword !== user.password) {
            throw new Error('Incorrect password');
        }
        // Generate the JWT Token
        const token = JWT.sign({ id: user.id, email: user.email, password: user.password }, JWT_SECRET);
        return token;
    }
}
export default UserService;
//# sourceMappingURL=user.js.map