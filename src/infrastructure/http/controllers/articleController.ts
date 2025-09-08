import {Request, Response} from "express";
import CreateArticle from "../../../application/services/createArticle";
import ArticleRepositoryImpl from "../../persistence/repositories/articleRepositoryImpl";
import db from "../../persistence/db";
import GetListArticle from "../../../application/services/getListArticle";
import {CreateArticleBody} from "../../persistence/articleMapper";
import GetByIdArticle from "../../../application/services/getByIdArticle";
import TagRepositoryImpl from "../../persistence/repositories/tagRepositoryImpl";
import GetOrCreateTag from "../../../application/services/getOrCreateTag";
import ArticleTagRepositoryImpl from "../../persistence/repositories/articleTagRepository";
import CreateArticleTag from "../../../application/services/createArticleTag";
import FindManyByIdTag from "../../../application/services/findManyByIdTag";
import FindArticleTag from "../../../application/services/findArticleTag";
import UpdateArticle from "../../../application/services/updateArticle";
import DeleteTagsLinkByArticle from "../../../application/services/deleteTagsLinkByArticle";
import FindTagsByArticle from "../../../application/services/findTagsByArticle";
import DeleteArticle from "../../../application/services/deleteArticle";
import FindArticlesByTags from "../../../application/services/findArticlesByTags";
import {AuthRequest} from "../routes/middleware/auth";

const articleRepo = new ArticleRepositoryImpl(db);
const tagRepo = new TagRepositoryImpl(db);
const articleTagRepo = new ArticleTagRepositoryImpl(db);

const createArticleTag = new CreateArticleTag(articleTagRepo);
const findManyByIdTag = new FindManyByIdTag(tagRepo);
const findArticleTag = new FindArticleTag(articleTagRepo);
const deleteTagsLinkByArticle = new DeleteTagsLinkByArticle(articleTagRepo);
const findTagsByArticle = new FindTagsByArticle(findArticleTag, findManyByIdTag);
const deleteArticle = new DeleteArticle(articleRepo);
const findArticlesByTags = new FindArticlesByTags(articleRepo);

const getListArticle = new GetListArticle(articleRepo, findTagsByArticle, findArticlesByTags);
const getByIdArticle = new GetByIdArticle(articleRepo, findTagsByArticle);
const getOrCreateTag = new GetOrCreateTag(tagRepo);
const createArticle = new CreateArticle(articleRepo, getOrCreateTag, createArticleTag, findTagsByArticle);
const updateArticle = new UpdateArticle(
    articleRepo,
    deleteTagsLinkByArticle,
    createArticleTag,
    getOrCreateTag,
    findTagsByArticle
);

class ArticleController {
    static async create(req: Request, res: Response) {
        try {
            const {title, isPublic, content, tags} = req.body as CreateArticleBody;

            const {user} = (req as AuthRequest);

            if (!user) {
                res.status(403).send();
                return;
            }

            const article = await createArticle.execute({
                    title,
                    isPublic,
                    content,
                    authorId: user.uuid,
                }, tags
            );

            res.status(201).send(article);
        } catch (err) {
            console.error(err);
            res.status(500).send({});
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const {id} = req.params;

            const {user} = (req as AuthRequest);
            const article = await getByIdArticle.execute(id);

            if (!article) {
                res.status(404).send({});
                return;
            }

            if(!user && !article.isPublic) {
                res.status(403).send();
                return;
            }

            res.status(200).send(article);
        } catch (err) {
            console.error(err);
            res.status(500).send({});
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const {title, isPublic, content, tags} = req.body as CreateArticleBody;

            const {user} = (req as AuthRequest);

            if(!user){
                res.status(403).send();
                return;
            }

            const article = await updateArticle.execute(id, {
                title,
                isPublic,
                content,
            }, tags);

            if (!article) {
                res.status(404).send({});
                return;
            }

            res.status(200).send(article);
        } catch (err) {
            console.error(err);
            res.status(500).send({});
        }
    }

    static async deleteById(req: Request, res: Response) {
        try {
            const {id} = req.params;

            const {user} = (req as AuthRequest);
            if (!user) {
                res.status(403).send({});
            }

            const count = await deleteArticle.execute(id);
            if (!count) {
                res.status(404).send({});
                return;
            }

            res.status(200).send({});
        } catch (err) {
            console.error(err);
            res.status(500).send({});
        }
    }

    static async getList(req: Request, res: Response) {
        try {
            const {user} = (req as AuthRequest);

            const filtersTags = (req.query["filters[tags]"] as string)?.split(",");
            const list = await getListArticle.execute({tags: filtersTags});

            res.status(200).json(user ? list : list.filter(l => l.isPublic));
        } catch (error) {
            console.error(error);
            res.status(500).json({});
        }
    }
}

export default ArticleController;
