import type { Response } from "express";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Like from "../models/like.model.js";
import Bookmark from "../models/bookmark.model.js";
import Follow from "../models/follow.model.js";

const getInteractionStates = async (userId: string, posts: any[]) => {
    const postIds = posts.map((p) => p._id);
    const [likes, bookmarks, retweets] = await Promise.all([
        Like.find({ user: userId, post: { $in: postIds } }),
        Bookmark.find({ user: userId, post: { $in: postIds } }),
        Post.find({ user: userId, originalPost: { $in: postIds }, isRetweet: true }),
    ]);

    const likedPostIds = new Set(likes.map((l) => l.post.toString()));
    const bookmarkedPostIds = new Set(bookmarks.map((b) => b.post.toString()));
    const retweetedPostIds = new Set(retweets.map((r) => r.originalPost?.toString()).filter((id): id is string => !!id));

    return posts.map((post) => {
        const postObj = post.toObject();
        return {
            ...postObj,
            isLiked: likedPostIds.has(postObj._id.toString()),
            isBookmarked: bookmarkedPostIds.has(postObj._id.toString()),
            isRetweeted: retweetedPostIds.has(postObj._id.toString()),
        };
    });
};

export const createPost = async (req: any, res: Response): Promise<any> => {
    try {
        const { text, img } = req.body;
        const userId = req.user._id;

        if (!text && !img) {
            return res.status(400).json({ status: "error", errors: ["Post must have text or image"] });
        }

        const newPost = new Post({
            user: userId,
            text,
            img,
        });

        await newPost.save();
        res.status(201).json({ status: "success", data: newPost });
    } catch (error: any) {
        console.error("POST CONTROLLER ERROR : CreatePost Error :", error.message);
        res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};

export const getAllPosts = async (req: any, res: Response): Promise<any> => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({ path: "user", select: "-password" })
            .populate({ path: "originalPost", populate: { path: "user", select: "-password" } });

        if (posts.length === 0) return res.status(200).json({ status: "success", data: [] });

        const postsWithInteractions = await getInteractionStates(req.user._id, posts);

        res.status(200).json({ status: "success", data: postsWithInteractions });
    } catch (error: any) {
        console.error("POST CONTROLLER ERROR : GetAllPosts Error :", error.message);
        res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};

export const likePost = async (req: any, res: Response): Promise<any> => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ status: "error", errors: ["Post not found"] });

        const existingLike = await Like.findOne({ user: userId, post: postId });

        if (existingLike) {
            await Like.deleteOne({ _id: existingLike._id });
            await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
            res.status(200).json({ status: "success", message: "Post unliked" });
        } else {
            const newLike = new Like({ user: userId, post: postId });
            await newLike.save();
            await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
            res.status(200).json({ status: "success", message: "Post liked" });
        }
    } catch (error: any) {
        console.error("POST CONTROLLER ERROR : LikePost Error :", error.message);
        res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};

export const retweetPost = async (req: any, res: Response): Promise<any> => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ status: "error", errors: ["Post not found"] });

        const existingRetweet = await Post.findOne({ user: userId, originalPost: postId, isRetweet: true });

        if (existingRetweet) {
            await Post.deleteOne({ _id: existingRetweet._id });
            await Post.findByIdAndUpdate(postId, { $inc: { retweetsCount: -1 } });
            res.status(200).json({ status: "success", message: "Retweet removed" });
        } else {
            const newRetweet = new Post({
                user: userId,
                originalPost: postId,
                isRetweet: true,
            });
            await newRetweet.save();
            await Post.findByIdAndUpdate(postId, { $inc: { retweetsCount: 1 } });
            res.status(200).json({ status: "success", message: "Post retweeted" });
        }
    } catch (error: any) {
        console.error("POST CONTROLLER ERROR : RetweetPost Error :", error.message);
        res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};

export const savePost = async (req: any, res: Response): Promise<any> => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ status: "error", errors: ["Post not found"] });

        const existingBookmark = await Bookmark.findOne({ user: userId, post: postId });

        if (existingBookmark) {
            await Bookmark.deleteOne({ _id: existingBookmark._id });
            await Post.findByIdAndUpdate(postId, { $inc: { bookmarksCount: -1 } });
            res.status(200).json({ status: "success", message: "Post removed from bookmarks" });
        } else {
            const newBookmark = new Bookmark({ user: userId, post: postId });
            await newBookmark.save();
            await Post.findByIdAndUpdate(postId, { $inc: { bookmarksCount: 1 } });
            res.status(200).json({ status: "success", message: "Post bookmarked" });
        }
    } catch (error: any) {
        console.error("POST CONTROLLER ERROR : SavePost Error :", error.message);
        res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};

export const getUserPosts = async (req: any, res: Response): Promise<any> => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ status: "error", errors: ["User not found"] });

        const posts = await Post.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate({ path: "user", select: "-password" })
            .populate({ path: "originalPost", populate: { path: "user", select: "-password" } });

        const postsWithInteractions = await getInteractionStates(req.user._id, posts);

        res.status(200).json({ status: "success", data: postsWithInteractions });
    } catch (error: any) {
        console.error("POST CONTROLLER ERROR : GetUserPosts Error :", error.message);
        res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};

export const getFollowingPosts = async (req: any, res: Response): Promise<any> => {
    try {
        const userId = req.user._id;
        const followingRecords = await Follow.find({ follower: userId }).select("following");
        const followingIds = followingRecords.map((f) => f.following);

        const posts = await Post.find({ user: { $in: followingIds } })
            .sort({ createdAt: -1 })
            .populate({ path: "user", select: "-password" })
            .populate({ path: "originalPost", populate: { path: "user", select: "-password" } });

        if (posts.length === 0) return res.status(200).json({ status: "success", data: [] });

        const postsWithInteractions = await getInteractionStates(userId, posts);

        res.status(200).json({ status: "success", data: postsWithInteractions });
    } catch (error: any) {
        console.error("POST CONTROLLER ERROR : GetFollowingPosts Error :", error.message);
        res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};
