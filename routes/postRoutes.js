
import { Router } from "express";
import { createPost, getAllPosts, getAllPostsByUserId, getPostById } from "../controllers/postController.js";

const router = Router();

// create post 
router.route('/')
    .post(createPost)
    .get(getAllPosts)

router.route('/:id')
    .get(getPostById)

router.route('/user/:id')
    .get(getAllPostsByUserId)

export default router;