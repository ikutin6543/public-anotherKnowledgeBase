import ArticleMapper, {ArticleDb} from "../articleMapper";
import Article from "../../../domain/entities/article";
import ArticleRepository from "../../../domain/repositories/articleRepository";
import {Knex} from "knex";

class ArticleRepositoryImpl implements ArticleRepository {
    constructor(private readonly db: Knex) {
    }

    async findByTags(tags: string[]): Promise<Article[]> {
        const records = await this.db('tag')
            .join("article_tag", "tag.uuid", "article_tag.tag_id")
            .join("article", "article_tag.article_id", "article.uuid")
            .whereIn("name", tags)
            .select<ArticleDb[]>("article.*");
        return records.map((record) => ArticleMapper.toDomain(record));
    }

    async update(uuid: string, article: Article): Promise<Article> {
        const [record] = await this.db("article").where({uuid}).update<ArticleDb>(ArticleMapper.toPersistence(article)).returning("*");
        return ArticleMapper.toDomain(record);
    }

    async save(article: Article): Promise<Article | null> {
        const [record] = await this.db("article").insert<ArticleDb>(ArticleMapper.toPersistence(article)).returning("*");

        if (!record) {
            return null;
        }

        return ArticleMapper.toDomain(record);
    }

    async findAll(): Promise<Article[]> {
        const records = await this.db.select("*").from<ArticleDb>("article");
        return records.map((record) => ArticleMapper.toDomain(record));
    }

    async findById(uuid: string): Promise<Article | null> {
        const record = await this.db.select("*").from<ArticleDb>("article").where({uuid}).first();

        if (!record) {
            return null;
        }

        return ArticleMapper.toDomain(record);
    }

    async deleteById(uuid: string): Promise<number> {
        return this.db.delete().from<ArticleDb>("article").where({uuid});
    }
}

export default ArticleRepositoryImpl;
