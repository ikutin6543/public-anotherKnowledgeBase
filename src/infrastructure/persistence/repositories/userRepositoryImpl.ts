import {Knex} from "knex";
import UserRepository from "../../../domain/repositories/userRepository";
import User from "../../../domain/entities/user";
import UserMapper, {UserDb} from "../userMapper";

class UserRepositoryImpl implements UserRepository {
    constructor(private readonly db: Knex) {
    }

    async getByEmail(email: string): Promise<User | null> {
        const record = await this.db("user").where("email", email).first<UserDb>();

        if(!record){
            return null;
        }

        return UserMapper.toDomain(record);
    }

    async save(user: User): Promise<User> {
        const [record] = await this.db("user").insert(UserMapper.toPersistence(user)).returning<UserDb[]>("*");
        return UserMapper.toDomain(record);
    }

    deleteById(id: string): Promise<number> {
        return this.db("user").where("uuid", id).delete();
    }
}

export default UserRepositoryImpl;
