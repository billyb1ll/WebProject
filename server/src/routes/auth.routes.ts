import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import {
	authMiddleware,
	adminAuthMiddleware,
} from "../middleware/authMiddleware";

const router = Router();
const authController = new AuthController();

// Authentication routes
router.post("/register", authController.register);
router.post("/validate", authController.validate);
router.get("/profile", authMiddleware, authController.getProfile);

// Unified login endpoint
router.post("/unified-login", authController.unifiedLogin);

// Password reset routes
router.post("/request-password-reset", authController.requestPasswordReset);
router.post("/reset-password", authController.resetPassword);

// Admin authentication routes
router.post("/admin/login", authController.adminLogin);
router.get(
	"/admin/profile",
	adminAuthMiddleware,
	authController.getAdminProfile
);

export default router;
