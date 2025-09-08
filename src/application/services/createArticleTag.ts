import {ArticleTagRepository} from "../../domain/repositories/articleTagRepository";
import ArticleTag, {ArticleTagData} from "../../domain/entities/articleTag";

class CreateArticleTag {
    constructor(private readonly articleTagRepo: ArticleTagRepository) {
    }

    async execute(data: ArticleTagData): Promise<ArticleTag | null> {
        const articleTag = ArticleTag.create(data);
        console.log({articleTag});
        
        return this.articleTagRepo.save(articleTag);
    }
}

export default CreateArticleTag;
