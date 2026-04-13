import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { followUnfollowUser, getAllUsers, getSuggestedUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/suggested", protectRoute, getSuggestedUsers);
router.get("/all", protectRoute, getAllUsers);
router.post("/follow/:id", protectRoute, followUnfollowUser);

export default router;
