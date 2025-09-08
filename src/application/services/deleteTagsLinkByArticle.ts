import {ArticleTagRepository} from "../../domain/repositories/articleTagRepository";

class DeleteTagsLinkByArticle {
    constructor(private readonly articleTagRepo: ArticleTagRepository) {
    }

    execute(uuid: string): Promise<void> {
        return this.articleTagRepo.deleteByArticle(uuid);
    }
}

export default DeleteTagsLinkByArticle;
