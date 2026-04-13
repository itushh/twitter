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

// Indexes for scalability
postSchema.index({ createdAt: -1 }); // Global feed
postSchema.index({ user: 1, createdAt: -1 }); // User profile feed
postSchema.index({ originalPost: 1 }); // Finding retweets of a post

const Post = mongoose.model("Post", postSchema);

export default Post;
