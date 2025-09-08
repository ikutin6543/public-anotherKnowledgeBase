import UserRepository from "../../domain/repositories/userRepository";
import User from "../../domain/entities/user";

export interface CreateUserBody {
    email: string;
    password: string;
}

class CreateUser {
    constructor(private readonly userRepo: UserRepository) {
    }

    async execute(data: CreateUserBody): Promise<User> {
        return this.userRepo.save(await User.create(data));
    }
}

export default CreateUser;
