import type { Request, Response } from "express";
import User from "../models/user.model.js";
import Follow from "../models/follow.model.js";
import mongoose from "mongoose";

export const getSuggestedUsers = async (req: any, res: Response): Promise<any> => {
    try {
        const userId = req.user._id;

        // Get people the user is already following
        const followingRecords = await Follow.find({ follower: userId }).select("following");
        const followingIds = followingRecords.map((f) => f.following);

        // Find users not followed by current user, and not the current user themselves
        // Limit to 3 for the widget
        const suggestedUsers = await User.find({
            _id: { $nin: [...followingIds, userId] },
        })
            .sort({ createdAt: -1 })
            .limit(3)
            .select("-password");

        res.status(200).json({ status: "success", data: suggestedUsers });
    } catch (error: any) {
        console.error("USER CONTROLLER ERROR : getSuggestedUsers :", error.message);
        res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};

export const getAllUsers = async (req: any, res: Response): Promise<any> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        const users = await User.find({ _id: { $ne: req.user._id } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select("-password");

        const total = await User.countDocuments({ _id: { $ne: req.user._id } });

        // Add follow status for each user
        const followingRecords = await Follow.find({ follower: req.user._id }).select("following");
        const followingIds = followingRecords.map((f) => f.following.toString());

        const usersWithFollowStatus = users.map((u) => {
            const userObj = u.toObject();
            return {
                ...userObj,
                isFollowing: followingIds.includes(u._id.toString()),
            };
        });

        res.status(200).json({
            status: "success",
            data: {
                users: usersWithFollowStatus,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        console.error("USER CONTROLLER ERROR : getAllUsers :", error.message);
        res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};

export const followUnfollowUser = async (req: any, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const currentUser = req.user._id;

        if (id === currentUser.toString()) {
            return res.status(400).json({ status: "error", errors: ["You cannot follow yourself"] });
        }

        const userToModify = await User.findById(id);
        if (!userToModify) {
            return res.status(404).json({ status: "error", errors: ["User not found"] });
        }

        const isFollowing = await Follow.findOne({ follower: currentUser, following: id });

        if (isFollowing) {
            // Unfollow
            await Promise.all([
                Follow.deleteOne({ _id: isFollowing._id }),
                User.findByIdAndUpdate(currentUser, { $inc: { followingCount: -1 } }),
                User.findByIdAndUpdate(id, { $inc: { followersCount: -1 } }),
            ]);

            const [updatedMe, updatedThem] = await Promise.all([
                User.findById(currentUser).select("followingCount"),
                User.findById(id).select("followersCount")
            ]);

            res.status(200).json({
                status: "success",
                message: "User unfollowed successfully",
                followed: false,
                followingCount: updatedMe?.followingCount,
                followersCount: updatedThem?.followersCount,
            });
        } else {
            // Follow
            await Promise.all([
                Follow.create({ follower: currentUser, following: id }),
                User.findByIdAndUpdate(currentUser, { $inc: { followingCount: 1 } }),
                User.findByIdAndUpdate(id, { $inc: { followersCount: 1 } }),
            ]);
            res.status(200).json({ status: "success", message: "User followed successfully", followed: true });
        }
    } catch (error: any) {
        console.error("USER CONTROLLER ERROR : followUnfollowUser :", error.message);
        res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};
