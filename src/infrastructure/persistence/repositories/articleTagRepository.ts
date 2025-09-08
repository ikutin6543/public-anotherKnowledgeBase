/* eslint-disable camelcase */
import {ArticleTagRepository} from "../../../domain/repositories/articleTagRepository";
import {ArticleTagSearchParams} from "../../../domain/repositories/articleTagSearchParams";
import ArticleTag from "../../../domain/entities/articleTag";
import {Knex} from "knex";
import ArticleTagMapper, {ArticleTagDb} from "../articleTagMapper";

class ArticleTagRepositoryImpl implements ArticleTagRepository {
    constructor(private readonly db: Knex) {
    }

    deleteByArticle(uuid: string): Promise<void> {
        return this.db("article_tag").where("article_id", uuid).del();
    }

    async find(options: ArticleTagSearchParams): Promise<ArticleTag[]> {
        const query = this.db.from("article_tag");

        if (options.articleId) {
            query.where({article_id: options.articleId,});
        }
        if (options.tagId) {
            query.andWhere({tag_id: options.tagId});
        }
        const records = await query.select<ArticleTagDb[]>("*");
        return records.map(row => ArticleTagMapper.toDomain(row));
    }

    async save(articleTag: ArticleTag): Promise<ArticleTag | null> {
        const [record] = await this.db.insert<ArticleTagDb>(ArticleTagMapper.toPersistence(articleTag)).from("article_tag").returning("*");
        return ArticleTagMapper.toDomain(record);
    }
}

export default ArticleTagRepositoryImpl;
