import bcrypt from "bcrypt";
import {v4 as uuidV4} from 'uuid';
import jwt from "jsonwebtoken";

export interface BaseUserData {
    email: string;
    password: string;
}

export interface ArticleProps extends BaseUserData {
    uuid: string;
    createdAt: Date;
}

interface JwtPayload {
    email: string;
}

const JWT_SECRET = 'secret';

// Создание токена
const generateToken=(payload: JwtPayload)=> jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1h' // Время жизни токена
});

class User {
    uuid: string;
    email: string;
    password: string;
    createdAt: Date;

    constructor(props: ArticleProps) {
        this.uuid = props.uuid;
        this.email = props.email;
        this.password = props.password;
        this.createdAt = props.createdAt;
    }

    static restore(props: ArticleProps): User {
        return new User(props);
    }

    static async create(data: BaseUserData) {
        const salt = await bcrypt.genSalt(10);

        return new User({
            email: data.email,
            password: await bcrypt.hash(data.password, salt),
            createdAt: new Date(),
            uuid: uuidV4()
        });
    }

    async checkPassword(password: string) {
        return bcrypt.compare(password, this.password);
    }

    generateToken() {
        return generateToken({
            email: this.email,
        });
    }
}

export default User;
