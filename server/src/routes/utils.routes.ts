import { Router } from "express";
import { UtilsController } from "../controllers/utils.controller";
import { adminAuthMiddleware } from "../middleware/authMiddleware";

export const utilsRouter = Router();
const utilsController = new UtilsController();

// GET routes - public reviews (เช่น รีวิวที่ได้รับการยืนยันแล้ว)
utilsRouter.get("/reviews", utilsController.getAllReviews);

// GET routes - admin only (สำหรับดูรีวิวทั้งหมด รวมถึงที่ยังไม่ได้รับการยืนยัน)
utilsRouter.get(
	"/admin/reviews",
	adminAuthMiddleware,
	utilsController.getAllReviews
);

export default utilsRouter;
