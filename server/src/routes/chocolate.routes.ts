import { Router } from "express";
import { ChocolateController } from "../controllers/chocolate.controller";

export const chocolateRouter = Router();
const chocolateController = new ChocolateController();

// GET routes for chocolate customization options
chocolateRouter.get("/types", chocolateController.getChocolateTypes);
chocolateRouter.get("/toppings", chocolateController.getToppings);
chocolateRouter.get("/shapes", chocolateController.getShapes);
chocolateRouter.get("/packaging", chocolateController.getPackagingOptions);
chocolateRouter.get("/pricing", chocolateController.getPricing);
chocolateRouter.get("/custom/:id", chocolateController.getCustomChocolateOrder);

// POST routes for custom orders
chocolateRouter.post("/custom", chocolateController.createCustomOrder);

export default chocolateRouter;