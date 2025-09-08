import TagRepository from "../../domain/repositories/tagRepository";
import Tag from "../../domain/entities/tag";

class FindManyByIdTag {
    constructor(private readonly tagRepo: TagRepository) {
    }

    async execute(uuids: string[]): Promise<Tag[]> {
        return this.tagRepo.findManyById(uuids);
    }
}

export default FindManyByIdTag;
