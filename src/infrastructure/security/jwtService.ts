import jwt from "jsonwebtoken";

export class JwtService {
    constructor(private readonly secret: string) {
    }

    generateToken<T extends object = {}>(payload: T): string {
        return jwt.sign(payload, this.secret, {expiresIn: "1h"});
    }

    verifyToken<T extends object = {}>(token: string): T {
        return jwt.verify(token, this.secret) as jwt.JwtPayload & T;
    }
}

export default JwtService;
