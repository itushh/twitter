import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        img: {
            type: String,
        },
        // For retweets
        originalPost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        isRetweet: {
            type: Boolean,
            default: false,
        },
        likesCount: {
            type: Number,
            default: 0,
        },
        retweetsCount: {
            type: Number,
            default: 0,
        },
        bookmarksCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
