import {Request, Response, NextFunction} from "express";
import JwtService from "../../../security/jwtService";
import db from "../../../db";
import UserRepositoryImpl from "../../../persistence/repositories/userRepositoryImpl";
import User from "../../../../domain/entities/user";

const jwtService = new JwtService(process.env.JWT_SECRET!);

export interface UserJwtPayload {
    email: string;
    id: string
}

const userRepository = new UserRepositoryImpl(db);

export interface AuthRequest extends Request {
    user: User | null
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace("Bearer ", "");

    req.user = null;
    if (token) {
        try {
            const payload = jwtService.verifyToken<UserJwtPayload>(token);
            req.user = await userRepository.getByEmail(payload.email);
            console.log(req.user);
            next();
        } catch {
            res.status(401).send({});
        }
    } else {
        next();
    }
}
