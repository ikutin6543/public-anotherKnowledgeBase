import {v4 as uuidV4} from 'uuid';

export interface BaseTagData {
    name: string;
}

export interface TagProps extends BaseTagData {
    createdAt: Date;
    uuid: string;
}

class Tag {
    uuid: string;
    name: string;
    createdAt: Date;

    private constructor(data: TagProps) {
        this.uuid = data.uuid;
        this.name = data.name;
        this.createdAt = data.createdAt;
    }

    static restore(data: TagProps): Tag {
        return new Tag(data);
    }

    static create(data: BaseTagData) {
        return new Tag({
            uuid: uuidV4(),
            name: data.name,
            createdAt: new Date(),
        });
    }
}

export default Tag;
