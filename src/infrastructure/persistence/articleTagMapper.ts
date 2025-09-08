/* eslint-disable camelcase */
import ArticleTag from "../../domain/entities/articleTag";

export interface ArticleTagDb {
    uuid: string;
    article_id: string;
    tag_id: string;
    created_at: string;
}

class ArticleTagMapper {
    static toDomain(record: ArticleTagDb): ArticleTag {
        return ArticleTag.restore({
            uuid: record.uuid,
            articleId: record.article_id,
            tagId: record.tag_id,
            createdAt: new Date(record.created_at)
        });
    }

    static toPersistence(articleTag: ArticleTag): ArticleTagDb {
        return {
            uuid: articleTag.uuid,
            article_id: articleTag.articleId,
            tag_id: articleTag.tagId,
            created_at: articleTag.createdAt.toISOString(),
        };
    }
}

export default ArticleTagMapper;
