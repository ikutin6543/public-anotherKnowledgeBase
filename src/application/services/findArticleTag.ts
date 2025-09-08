import {ArticleTagRepository} from "../../domain/repositories/articleTagRepository";
import ArticleTag from "../../domain/entities/articleTag";
import {ArticleTagSearchParams} from "../../domain/repositories/articleTagSearchParams";

class FindArticleTag {
    constructor(private readonly articleTagRepo: ArticleTagRepository) {
    }

    async execute(data: ArticleTagSearchParams): Promise<ArticleTag[]> {
        return this.articleTagRepo.find(data);
    }
}

export default FindArticleTag;
