import { Router } from 'express';
import { userGet, userPost } from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', userGet);
userRouter.post('/', userPost);

export { userRouter };
