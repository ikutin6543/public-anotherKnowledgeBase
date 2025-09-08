import TagRepository from "../../domain/repositories/tagRepository";
import Tag from "../../domain/entities/tag";

class getOrCreateTag {
    constructor(private readonly tagRepo: TagRepository) {
    }

    async execute(name: string): Promise<Tag | null> {
        const tag = await this.tagRepo.findByName(name);

        if (tag) {
            return tag;
        }

        return this.tagRepo.save(Tag.create({name}));
    }
}

export default getOrCreateTag;
