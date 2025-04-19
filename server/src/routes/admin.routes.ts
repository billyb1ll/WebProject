import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { adminAuthMiddleware } from "../middleware/authMiddleware";

const router = Router();
const adminController = new AdminController();

router.post("/login", adminController.login);
router.get("/profile", adminAuthMiddleware, adminController.getProfile);
router.put("/profile", adminAuthMiddleware, adminController.updateProfile);

export default router;
