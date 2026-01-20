import  { prismaClient }  from "../lib/db.js";
import JWT from "jsonwebtoken";
import {createHmac, randomBytes} from "node:crypto";

const JWT_SECRET = "$uperm@an";

export interface CreateUserPayload {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    salt: string
}

export interface GetUserTokenPayload {
    email: string,
    password: string,
}

class UserService {
    private static generateHash(salt: string, password: string)
    {
        const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");
        return hashedPassword;
    }
    public static createUser(payload: CreateUserPayload ) {
        let {firstName, lastName, email, password, salt} = payload;
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

    private static getUserByEmail(email: string)
    {
       return prismaClient.user.findUnique({where: {email}});
    }

    public static getUserById(id: string)
    {
        return prismaClient.user.findUnique({where: {id}});
    }

    public static async getUserToken(payload: GetUserTokenPayload)
    {
        const {email, password} = payload;
        const user = await UserService.getUserByEmail(email);
        if(!user) throw new Error('user not found');
        const salt = user.salt;
        const userHashedPassword = UserService.generateHash(salt, password);

        if(userHashedPassword !== user.password)
        {
            throw new Error('Incorrect password')
        }

        // Generate the JWT Token
        const token = JWT.sign({id: user.id, email: user.email, password: user.password}, JWT_SECRET);
        return token;
    }

    public static decodeJWTTOKEN(token: string)
    {
        return JWT.verify(token, JWT_SECRET);
    }
}

export default UserService;