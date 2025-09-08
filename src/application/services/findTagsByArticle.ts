import FindArticleTag from "./findArticleTag";
import FindManyByIdTag from "./findManyByIdTag";
import Tag from "../../domain/entities/tag";

class FindTagsByArticle {
    constructor(
        private readonly findArticleTag: FindArticleTag,
        private readonly findManyByIdTag: FindManyByIdTag
    ) {
    }

    async execute(uuid: string): Promise<Tag[]> {
        const articleTags = await this.findArticleTag.execute({articleId: uuid});
        return this.findManyByIdTag.execute(articleTags.map(articleTag => articleTag.tagId));
    }
}
export default FindTagsByArticle;
