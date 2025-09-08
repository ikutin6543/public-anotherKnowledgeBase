import ArticleRepository from "../../domain/repositories/articleRepository";
import Article, {BaseArticleData} from "../../domain/entities/article";
import GetOrCreateTag from "./getOrCreateTag";
import CreateArticleTag from "./createArticleTag";
import Tag from "../../domain/entities/tag";
import FindTagsByArticle from "./findTagsByArticle";

class CreateArticle {
    constructor(
        private readonly articleRepo: ArticleRepository,
        private readonly getOrCreateTag: GetOrCreateTag,
        private readonly createArticleTag: CreateArticleTag,
        private readonly findTagsByArticle: FindTagsByArticle,
    ) {
    }

    async execute(data: BaseArticleData, tags: string[]): Promise<Article> {
        const tagsModels = (await Promise.all(tags.map((name) => this.getOrCreateTag.execute(name)))).filter(Boolean) as Tag[];
        const article = Article.create(data);

        await this.articleRepo.save(article);

        await Promise.all(tagsModels.map((tag) => {
                console.log({tag});
                return this.createArticleTag.execute({
                        tagId: tag.uuid,
                        articleId: article.uuid
                    }
                );
            }
        ));

        const tgs=await this.findTagsByArticle.execute(article.uuid);
        article.addTags(tgs.map(tag => tag.name));

        return article;
    }
}

export default CreateArticle;
