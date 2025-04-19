import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const adminController = new AdminController();

router.post("/login", adminController.login);
router.get("/profile", authMiddleware, adminController.getProfile);
router.put("/profile", authMiddleware, adminController.updateProfile);

export default router;
