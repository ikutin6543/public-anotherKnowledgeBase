import TagRepository from "../../domain/repositories/tagRepository";
import Tag from "../../domain/entities/tag";

class FindByIdTag {
    constructor(private readonly tagRepo: TagRepository) {
    }

    async execute(uuid:string): Promise<Tag | null> {
        return this.tagRepo.findById(uuid);
    }
}

export default FindByIdTag;
