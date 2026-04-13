import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
    createPost,
    getAllPosts,
    likePost,
    retweetPost,
    savePost,
    getUserPosts,
    getFollowingPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);
router.get("/following", protectRoute, getFollowingPosts);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likePost);
router.post("/retweet/:id", protectRoute, retweetPost);
router.post("/save/:id", protectRoute, savePost);
router.get("/user/:username", protectRoute, getUserPosts);

export default router;
