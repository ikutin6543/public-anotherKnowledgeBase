import ArticleTag from "../entities/articleTag";
import {ArticleTagSearchParams} from "./articleTagSearchParams";

export interface ArticleTagRepository {
    save(data: ArticleTag): Promise<ArticleTag | null>

    find(options: ArticleTagSearchParams): Promise<ArticleTag[]>;

    deleteByArticle(uuid: string): Promise<void>
}
