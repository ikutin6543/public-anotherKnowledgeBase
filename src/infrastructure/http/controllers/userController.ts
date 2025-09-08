import {Request, Response} from "express";
import db from "../../persistence/db";
import UserRepositoryImpl from "../../persistence/repositories/userRepositoryImpl";
import CreateUser, {CreateUserBody} from "../../../application/services/createUser";
import LoginUser, {LoginUserBody} from "../../../application/services/loginUser";
import JwtService from "../../security/jwtService";
import {AuthRequest, UserJwtPayload} from "../routes/middleware/auth";
import DeleteUser from "../../../application/services/deleteUser";

const userRepo = new UserRepositoryImpl(db);

const createUser = new CreateUser(userRepo);
const loginUser = new LoginUser(userRepo);
const deleteUser = new DeleteUser(userRepo);

const jwtService = new JwtService(process.env.JWT_SECRET!);

class UserController {
    static async register(req: Request, res: Response) {
        try {
            const {password, email} = req.body as CreateUserBody;
            const user = await createUser.execute({email, password});

            res.status(201).send(user);
        } catch (err) {
            console.error(err);
            res.status(500).send({});
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const {password, email} = req.body as LoginUserBody;
            const user = await loginUser.execute({email, password});

            if (!user) {
                res.status(401).send({});
                return;
            }

            res.status(200).send({
                token: jwtService.generateToken<UserJwtPayload>({
                    email: user.email,
                    id: user.uuid
                })
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({});
        }
    }

    static async deleteById(req: Request, res: Response) {
        try {
            const {id} = req.params;

            const {user} = (req as AuthRequest);

            if (!user) {
                res.status(403).send();
                return;
            }

            const count = await deleteUser.execute(id);
            if (!count) {
                res.status(404).send({});
                return;
            }

            res.status(200).send({});
        } catch (err) {
            console.error(err);
            res.status(500).send({});
        }
    }
}

export default UserController;
