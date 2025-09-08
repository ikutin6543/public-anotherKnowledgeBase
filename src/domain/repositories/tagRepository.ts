import Tag from "../entities/tag";

interface TagRepository {
    findByName(name: string): Promise<Tag | null>;

    findById(uuid: string): Promise<Tag | null>;

    findManyById(uuid: string[]): Promise<Tag[]>;

    save(tag: Tag): Promise<Tag | null>;
}

export default TagRepository;
