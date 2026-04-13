import type { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils.js";

export const signup = async (req: Request, res: Response): Promise<any> => {
    try {
        const { fullName, username, email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ status: "error", errors: ["Invalid email format"] });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ status: "error", errors: ["Username is already taken"] });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ status: "error", errors: ["Email is already taken"] });
        }

        if (password.length < 6) {
            return res.status(400).json({ status: "error", errors: ["Password must be at least 6 characters long"] });
        }

        const newUser = new User({
            fullName,
            username,
            email,
            password,
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id.toString(), res);
            await newUser.save();

            res.status(201).json({
                status: "success",
                data: {
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    email: newUser.email,
                    profileImg: newUser.profileImg,
                    coverImg: newUser.coverImg,
                    followersCount: newUser.followersCount,
                    followingCount: newUser.followingCount,
                    postsCount: newUser.postsCount,
                },
            });
        } else {
            res.status(400).json({ status: "error", errors: ["Invalid user data"] });
        }
    } catch (error: any) {
        console.error("AUTH CONTROLLER ERROR : Signup Error :", error.message);
        res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ status: "error", errors: ["Invalid username or password"] });
        }

        generateTokenAndSetCookie(user._id.toString(), res);

        res.status(200).json({
            status: "success",
            data: {
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                profileImg: user.profileImg,
                coverImg: user.coverImg,
                followersCount: user.followersCount,
                followingCount: user.followingCount,
                postsCount: user.postsCount,
            },
        });
    } catch (error: any) {
        console.error("AUTH CONTROLLER ERROR : Login Error :", error.message);
        res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ status: "success", message: "Logged out successfully" });
    } catch (error: any) {
        console.error("AUTH CONTROLLER ERROR : Logout Error :", error.message);
        res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};

export const getMe = async (req: any, res: Response): Promise<any> => {
    res.status(200).json({ status: "success", data: req.user });
};