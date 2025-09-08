import ArticleRepository from "../../domain/repositories/articleRepository";
import Article, {BaseArticleData} from "../../domain/entities/article";
import DeleteTagsLinkByArticle from "./deleteTagsLinkByArticle";
import CreateArticleTag from "./createArticleTag";
import Tag from "../../domain/entities/tag";
import GetOrCreateTag from "./getOrCreateTag";
import FindTagsByArticle from "./findTagsByArticle";

class UpdateArticle {
    constructor(
        private readonly articleRepo: ArticleRepository,
        private readonly deleteTagsLinkByArticle: DeleteTagsLinkByArticle,
        private readonly createArticleTag: CreateArticleTag,
        private readonly getOrCreateTag: GetOrCreateTag,
        private readonly findTagsByArticle: FindTagsByArticle,
    ) {
    }

    async execute(uuid: string, data: Omit<BaseArticleData, "authorId">, tags?: string[]): Promise<Article | null> {
        const article = await this.articleRepo.findById(uuid);

        console.log("article", article, data);

        if (!article) {
            return null;
        }

        article.update(data);
        console.log("article2", article, data);

        await this.articleRepo.update(uuid, article);

        if (tags) {
            await this.deleteTagsLinkByArticle.execute(uuid);
            const tagsModels = (await Promise.all(tags.map((name) => this.getOrCreateTag.execute(name)))).filter(Boolean) as Tag[];

            console.log(tagsModels, article);

            await Promise.all(tagsModels.map((tag) => {
                    console.log({tag});
                    return this.createArticleTag.execute({
                            tagId: tag.uuid,
                            articleId: article.uuid
                        }
                    );
                }
            ));
        }
        const tgs = await this.findTagsByArticle.execute(article.uuid);
        article.addTags(tgs.map(tag => tag.name));

        return article;
    }
}

export default UpdateArticle;
