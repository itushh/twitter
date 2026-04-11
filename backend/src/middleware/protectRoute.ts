import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const protectRoute = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ status: "error", errors: ["Unauthorized: No Token Provided"] });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

        if (!decoded) {
            return res.status(401).json({ status: "error", errors: ["Unauthorized: Invalid Token"] });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ status: "error", errors: ["User not found"] });
        }

        req.user = user;
        next();
    } catch (error: any) {
        console.error("AUTH MIDDLEWARE ERROR : ProtectRoute Error :", error.message);
        return res.status(500).json({ status: "error", errors: ["Internal Server Error"] });
    }
};
