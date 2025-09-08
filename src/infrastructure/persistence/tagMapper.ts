/* eslint-disable camelcase */
import Tag from "../../domain/entities/tag";

export interface TagDb {
    uuid: string;
    name: string;
    created_at: string;
}

class TagMapper {
    static toDomain(record: TagDb): Tag {
        return Tag.restore({
            uuid: record.uuid,
            name: record.name,
            createdAt: new Date(record.created_at)
        });
    }

    static toPersistence(tag: Tag): TagDb {
        return {
            name: tag.name,
            uuid: tag.uuid,
            created_at: tag.createdAt.toISOString(),
        };
    }
}

export default TagMapper;
