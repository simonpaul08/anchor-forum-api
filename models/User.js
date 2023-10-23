import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    otp : String,
})

export default mongoose.model('User', userSchema);