import { Router } from "express";
import { signup, login, logout, getMe } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute, getMe);

export default router;