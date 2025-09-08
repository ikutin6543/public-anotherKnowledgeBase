import express from 'express';
import articleController from "../controllers/articleController";
import {authMiddleware} from "./middleware/auth";

const router = express.Router();

const article = express.Router();

// @ts-ignore
router.use(authMiddleware);

router.use("/article", article);

article.post('/', articleController.create);
article.get('/:id', articleController.getById);
article.patch('/:id', articleController.update);
article.delete('/:id', articleController.deleteById);
article.get('/', articleController.getList);

export default router;
