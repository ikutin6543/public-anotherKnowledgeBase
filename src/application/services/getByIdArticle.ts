import ArticleRepository from "../../domain/repositories/articleRepository";
import Article from "../../domain/entities/article";
import FindTagsByArticle from "./findTagsByArticle";

class GetListArticle {
    constructor(
        private readonly articleRepo: ArticleRepository,
        private readonly findTagsByArticle: FindTagsByArticle,
    ) {
    }

    async execute(uuid: string): Promise<Article | null> {
        const article = await this.articleRepo.findById(uuid);

        if (!article) {
            return null;
        }

        const tags=await this.findTagsByArticle.execute(uuid);

        article.addTags(tags.map(tag => tag.name));

        return article;
    }
}

export default GetListArticle;
