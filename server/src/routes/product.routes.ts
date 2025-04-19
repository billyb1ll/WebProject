import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

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

// POST routes
productRouter.post("/", productController.createProduct);

// PUT routes
productRouter.put("/:id", productController.updateProduct);

// DELETE routes
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
