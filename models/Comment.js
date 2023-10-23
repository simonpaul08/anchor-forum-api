import mongoose, { Schema } from "mongoose";


const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model('Comment', commentSchema);