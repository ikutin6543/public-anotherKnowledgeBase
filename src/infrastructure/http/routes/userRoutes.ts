import express from 'express';
import userController from "../controllers/userController";

const user = express.Router();
const router = express.Router();

router.use("/user", user);

user.post('/register', userController.register);
user.post('/login', userController.login);
user.delete('/:id', userController.deleteById);

export default router;
