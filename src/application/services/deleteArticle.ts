import ArticleRepository from "../../domain/repositories/articleRepository";

class DeleteArticle {
    constructor(private readonly articleRepo: ArticleRepository) {
    }

    async execute(uuid:string): Promise<number> {
        return this.articleRepo.deleteById(uuid);
    }
}

export default DeleteArticle;
