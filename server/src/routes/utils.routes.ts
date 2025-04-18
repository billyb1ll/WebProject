import { Router } from "express";
import { UtilsController } from "../controllers/utils.controller";

export const utilsRouter = Router();
const utilsController = new UtilsController();

// GET routes
utilsRouter.get("/reviews", utilsController.getAllReviews);

export default utilsRouter;
