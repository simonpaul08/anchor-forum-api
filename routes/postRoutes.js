
import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";

const router = Router();

// create post 
router.route('/')
    .post(createPost)
    .get(getAllPosts)


export default router;