import TagRepository from "../../domain/repositories/tagRepository";
import Tag from "../../domain/entities/tag";

class CreateTag {
    constructor(private readonly tagRepo: TagRepository) {
    }

    async execute(name: string): Promise<Tag | null> {
        const tag = Tag.create({name});

        return this.tagRepo.save(tag);
    }
}

export default CreateTag;
