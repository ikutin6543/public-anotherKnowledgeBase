import {v4 as uuidV4} from 'uuid';

export interface BaseArticleData {
    title: string;
    content: string;
    isPublic: boolean;
    authorId: string;
}

export interface ArticleProps extends BaseArticleData {
    uuid: string;
    createdAt: Date;
}

class Article {
    uuid: string;
    title: string;
    content: string;
    isPublic: boolean;
    createdAt: Date;
    authorId: string;
    tags: string[] = [];

    private constructor(props: ArticleProps) {
        this.uuid = props.uuid;
        this.title = props.title;
        this.content = props.content;
        this.isPublic = props.isPublic;
        this.createdAt = props.createdAt;
        this.authorId = props.authorId;
    }

    static restore(props: ArticleProps): Article {
        return new Article(props);
    }

    static create(data: BaseArticleData) {
        return new Article({
            uuid: uuidV4(),
            authorId: data.authorId,
            content: data.content,
            createdAt: new Date(),
            title: data.title,
            isPublic: data.isPublic,
        });
    }

    addTags(tags: string[]) {
        this.tags = tags;
        return this;
    }

    update(data: Omit<BaseArticleData, "authorId">) {
        console.log(data.isPublic, "sss");
        if (typeof data.isPublic !== "undefined") {
            this.isPublic = data.isPublic;
        }

        if (typeof data.title !== "undefined") {
            this.title = data.title;
        }

        if (typeof data.content !== "undefined") {
            this.content = data.content;
        }
    }
}

export default Article;
