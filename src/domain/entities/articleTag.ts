import {v4 as uuidV4} from 'uuid';

export interface ArticleTagData {
    articleId: string;
    tagId: string;
}

export interface ArticleTagProps extends ArticleTagData {
    uuid: string;
    createdAt: Date;
}

class ArticleTag {
    uuid: string;
    articleId: string;
    tagId: string;
    createdAt: Date;

    private constructor(props: ArticleTagProps) {
        this.uuid = props.uuid;
        this.articleId = props.articleId;
        this.tagId = props.tagId;
        this.createdAt = props.createdAt;
    }

    static restore(props: ArticleTagProps): ArticleTag {
        return new ArticleTag(props);
    }

    static create(data: ArticleTagData): ArticleTag {
        return new ArticleTag({
            uuid: uuidV4(),
            articleId: data.articleId,
            tagId: data.tagId,
            createdAt: new Date()
        });
    }
}

export default ArticleTag;
