import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // Asumiendo que tienes este middleware
import {
    login,
    verifyToken
} from "../controllers/seller.controllers.js";

const router = Router();

router.post("/login", login);
router.get("/verify", authMiddleware, verifyToken);

export default router;