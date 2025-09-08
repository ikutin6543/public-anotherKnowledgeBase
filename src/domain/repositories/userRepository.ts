import User from "../entities/user";

interface UserRepository {
    save(user: User): Promise<User>;
    getByEmail(email: string): Promise<User | null>;
    deleteById(id: string): Promise<number>;
}

export default UserRepository;
