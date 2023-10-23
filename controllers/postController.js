import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';

// POST, create post
export const createPost = asyncHandler(async (req, res) => {
    const { name, content, owner } = req.body;

    if(!name || !content) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.findOne({ name }).exec();
    if(post){
        return res.status(409).json({ message: "Post already exists" })
    }

    const newPost = await Post.create({ name, content, owner });

    if(newPost){
        res.status(200).json({ message: "Post created successfully" })
    }else {
        res.status(400).json({ message: "Something went wrong" });
    }

})

export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ }).lean().exec();

    if(posts?.length){
        res.status(200).json({ posts })
    }else {
        res.status(400).json({ message: "No posts found" })
    }
})