import { AUTH_TIMER } from "../libs/config";
import jwt from "jsonwebtoken";
import { User } from "../libs/types/user";
import Errors, { HttpCode, Message } from "../libs/Error";

class AuthService {
    private readonly secretToken;

    constructor() {
        this.secretToken = process.env.SECRET_TOKEN as string;
    }

    public async createToken(payload: User) {
        return new Promise((resolve, reject) => {
            const duration = `${AUTH_TIMER}h`;
            const plainPayload = payload.toObject ? payload.toObject() : payload;          
            const { password, ...tokenPayload } = plainPayload;
            
            jwt.sign(
                tokenPayload,
                process.env.SECRET_TOKEN as string,
                { expiresIn: duration },
                (err, token) => {
                    if (err) {
                        console.error("JWT sign error:", err);
                        reject(new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED));
                    } else resolve(token as string);
                }
            );
        });
    }

    public async checkAuth(token: string): Promise<User> {
        const result: User = (await jwt.verify(
            token,
            this.secretToken
        )) as User;
        console.log(`---[AUTH] userId: ${result.userId} ---`);
        return result;
    }
}

export default AuthService;