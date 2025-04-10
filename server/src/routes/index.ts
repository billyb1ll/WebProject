import { Router } from "express";
import productRoutes from "./product.routes";
import adminRoutes from "./admin.routes";
import chocolateRoutes from "./chocolate.routes";

const apiRouter = Router();

// Mount route groups
apiRouter.use("/products", productRoutes);
apiRouter.use("/admin", adminRoutes);
apiRouter.use("/chocolate", chocolateRoutes);

export { apiRouter };
