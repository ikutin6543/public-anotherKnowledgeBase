import UserRepository from "../../domain/repositories/userRepository";
import User from "../../domain/entities/user";

export interface LoginUserBody {
    email: string;
    password: string;
}

class LoginUser {
    constructor(private readonly userRepo: UserRepository) {
    }

    async execute(data: LoginUserBody): Promise<User | null> {
        const user = await this.userRepo.getByEmail(data.email);

        if (user && await user.checkPassword(data.password)) {
            return user;
        }

        return null;
    }
}

export default LoginUser;
