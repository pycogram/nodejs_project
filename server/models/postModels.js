import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
        select: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
}, {timestamps: true});

const postModel = mongoose.model('posts', postSchema);
export default postModel;