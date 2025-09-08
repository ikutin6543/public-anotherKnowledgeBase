/* eslint-disable camelcase */
import User from "../../domain/entities/user";

export interface UserDb {
    uuid: string;
    email: string;
    password: string;
    created_at: string;
}

class UserMapper {
    static toDomain(data: UserDb): User {
        return User.restore({
            uuid: data.uuid,
            email: data.email,
            createdAt: new Date(data.created_at),
            password: data.password
        });
    }

    static toPersistence(user: User): UserDb {
        return {
            password: user.password,
            uuid: user.uuid,
            email: user.email,
            created_at: user.createdAt.toISOString()
        };
    }
}

export default UserMapper;
