import mongoose, { Schema } from "mongoose";


const postSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refer: 'User'
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, refer: 'Comment' }]
})


export default mongoose.model('Post', postSchema);