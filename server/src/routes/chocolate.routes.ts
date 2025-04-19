import { Router } from "express";
import { ChocolateController } from "../controllers/chocolate.controller";
import { authMiddleware } from "../middleware/authMiddleware";

export const chocolateRouter = Router();
const chocolateController = new ChocolateController();

// GET routes for chocolate customization options (public)
chocolateRouter.get("/types", chocolateController.getChocolateTypes);
chocolateRouter.get("/toppings", chocolateController.getToppings);
chocolateRouter.get("/shapes", chocolateController.getShapes);
chocolateRouter.get("/packaging", chocolateController.getPackagingOptions);
chocolateRouter.get("/pricing", chocolateController.getPricing);

// Protected routes - require authentication
chocolateRouter.get(
	"/custom/:id",
	authMiddleware,
	chocolateController.getCustomChocolateOrder
);

// POST routes for custom orders - require authentication
chocolateRouter.post(
	"/custom",
	authMiddleware,
	chocolateController.createCustomOrder
);

export default chocolateRouter;
