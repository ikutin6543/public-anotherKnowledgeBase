import UserRepository from "../../domain/repositories/userRepository";

class DeleteUser {
    constructor(private readonly userRepo: UserRepository) {
    }

    async execute(id: string): Promise<number> {
        return this.userRepo.deleteById(id);
    }
}

export default DeleteUser;
