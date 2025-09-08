/* eslint-disable camelcase */
import Article from "../../domain/entities/article";

export interface ArticleDb {
    uuid: string;
    title: string;
    content: string;
    is_public: boolean;
    created_at: string;
    author_id: string;
}

export interface CreateArticleBody {
    title: string;
    content: string;
    isPublic: boolean;
    tags: string[];
}

class ArticleMapper {
    static toDomain(record: ArticleDb): Article {
        return Article.restore({
            uuid: record.uuid,
            title: record.title,
            content: record.content,
            isPublic: record.is_public,
            createdAt: new Date(record.created_at),
            authorId: record.author_id,
        });
    }

    static toPersistence(article: Article): ArticleDb {
        return {
            title: article.title,
            content: article.content,
            author_id: article.authorId,
            uuid: article.uuid,
            created_at: article.createdAt.toISOString(),
            is_public: article.isPublic
        };
    }
}

export default ArticleMapper;
