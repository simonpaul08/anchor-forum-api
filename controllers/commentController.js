import asyncHandler from 'express-async-handler';
import Comment from '../models/Comment.js';

// Post, create a comment
export const createComment = asyncHandler(async (req, res) => {
    const { content, owner, post } = req.body;

    if(!content || !owner || !post){
        return res.status(400).json({ message: "All fields are required" });
    }

    const comment = await Comment.create({ content, owner, post });

    if(comment){
        res.status(200).json({ message: "Comment created" });
    }else {
        res.status(400).json({ message: "Something went wrong" });
    }
})

// Get, get all comments by post
export const getAllCommentsByPost = asyncHandler(async (req, res) => {
    const { post } = req.body;

    if(!post){
        return res.status(400).json({ message: "All fields are required" });
    }

    const comments = await Comment.find({ post }).exec();

    if(comments?.length){
        res.status(200).json({ comments });
    }else {
        res.status(400).json({ message: "no comments found" })
    }
})

// Get, get all comments by post
export const getAllCommentsByOwner = asyncHandler(async (req, res) => {
    const { owner } = req.body;

    if(!owner){
        return res.status(400).json({ message: "All fields are required" });
    }

    const comments = await Comment.find({ owner }).exec();

    if(comments?.length){
        res.status(200).json({ comments });
    }else {
        res.status(400).json({ message: "no comments found" })
    }
})