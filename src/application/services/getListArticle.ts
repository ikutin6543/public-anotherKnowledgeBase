import ArticleRepository from "../../domain/repositories/articleRepository";
import Article from "../../domain/entities/article";
import FindTagsByArticle from "./findTagsByArticle";
import FindArticlesByTags from "./findArticlesByTags";

interface Filters {
    tags?: string[]
}

class GetListArticle {
    constructor(
        private readonly articleRepo: ArticleRepository,
        private readonly findTagsByArticle: FindTagsByArticle,
        private readonly findArticlesByTags: FindArticlesByTags,
    ) {
    }

    async execute(filters: Filters): Promise<Article[]> {
        const articles = await this.getArticles(filters);

        for (const article of articles) {
            const tags = await this.findTagsByArticle.execute(article.uuid);

            article.addTags(tags.map(tag => tag.name));
        }

        return articles;
    }

    private getArticles = (filters: Filters): Promise<Article[]> => {
        if(filters.tags){
            return this.findArticlesByTags.execute(filters.tags);
        }
        return this.articleRepo.findAll();
    };
}

export default GetListArticle;
