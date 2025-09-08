import TagRepository from "../../../domain/repositories/tagRepository";
import {Knex} from "knex";
import Tag from "../../../domain/entities/tag";
import TagMapper from "../tagMapper";

class TagRepositoryImpl implements TagRepository {
    constructor(private readonly db: Knex) {
    }

    async findManyById(uuids: string[]): Promise<Tag[]> {
        return this.db("tag").select<Tag[]>("*").whereIn("uuid", uuids);
    }

    async findById(uuid: string): Promise<Tag | null> {
        const tag = await this.db("tag").select<Tag>("*").where("uuid", uuid).first();
        return tag || null;
    }

    async findByName(name: string): Promise<Tag | null> {
        const tag = await this.db("tag").select<Tag>("*").where("name", name).first();
        return tag || null;
    }

    async save(tag: Tag): Promise<Tag | null> {
        const [record] = await this.db("tag").insert<Tag>(TagMapper.toPersistence(tag)).returning("*");
        return record;
    }
}

export default TagRepositoryImpl;
