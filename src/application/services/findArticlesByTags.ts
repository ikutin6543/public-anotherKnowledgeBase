import ArticleRepository from "../../domain/repositories/articleRepository";
import Article from "../../domain/entities/article";

class FindArticlesByTags {
    constructor(
        private readonly articleRepo: ArticleRepository,
    ) {
    }

    execute(tags: string[]): Promise<Article[]> {
        return this.articleRepo.findByTags(tags);
    }
}

export default FindArticlesByTags;
