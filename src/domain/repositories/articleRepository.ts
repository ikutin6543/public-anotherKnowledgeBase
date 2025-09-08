import Article from "../entities/article";

interface ArticleRepository {
    save(article: Article): Promise<Article | null>;

    findAll(): Promise<Article[]>;

    findById(id: string): Promise<Article | null>;

    update(uuid:string, article: Article): Promise<Article >;

    deleteById(uuid: string): Promise<number>;

    findByTags(tags: string[]): Promise<Article[]>;
}

export default ArticleRepository;
