

import { Router } from "express";
import { createComment, getAllCommentsByOwner, getAllCommentsByPost } from "../controllers/commentController.js";

const router = Router();

router.route('/')
    .post(createComment)

router.route('/post')
    .post(getAllCommentsByPost)

router.route('/user')
    .post(getAllCommentsByOwner)


export default router;