import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { adminAuthMiddleware } from "../middleware/authMiddleware";

export const productRouter = Router();
const productController = new ProductController();

// GET routes
productRouter.get("/", productController.getAllProducts);
productRouter.get("/featured", productController.getFeaturedProducts);
productRouter.get(
	"/category/:category",
	productController.getProductsByCategory
);
productRouter.get("/with-images/:id", productController.getProductWithImages);
productRouter.get("/:id", productController.getProductById);

// POST routes - require admin auth
productRouter.post("/", adminAuthMiddleware, productController.createProduct);

// PUT routes - require admin auth
productRouter.put("/:id", adminAuthMiddleware, productController.updateProduct);

// DELETE routes - require admin auth
productRouter.delete(
	"/:id",
	adminAuthMiddleware,
	productController.deleteProduct
);

export default productRouter;
