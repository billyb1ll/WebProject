import { Request, Response } from "express";
import { Product } from "../types/product";

export class ProductController {
	// Get all products
	public getAllProducts = async (req: Request, res: Response): Promise<void> => {
		try {
			// Mock data - in a real app, this would come from a database
			const products: Product[] = [
				{ id: 1, name: "Chocolate Bar", price: 2.99, category: "Regular" },
				{ id: 2, name: "Custom Box", price: 15.99, category: "Custom" },
			];

			res.status(200).json({ success: true, data: products });
		} catch (error) {
			res
				.status(500)
				.json({ success: false, message: "Failed to fetch products" });
		}
	};

	// Get product by ID
	public getProductById = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			// In a real app, fetch from database based on ID
			res.status(200).json({
				success: true,
				data: {
					id: parseInt(id),
					name: "Sample Product",
					price: 9.99,
					category: "Regular",
				},
			});
		} catch (error) {
			res.status(500).json({ success: false, message: "Failed to fetch product" });
		}
	};

	// Create new product
	public createProduct = async (req: Request, res: Response): Promise<void> => {
		try {
			const productData = req.body;
			// In a real app, save to database
			res.status(201).json({ success: true, data: { id: 3, ...productData } });
		} catch (error) {
			res
				.status(500)
				.json({ success: false, message: "Failed to create product" });
		}
	};

	// Update existing product
	public updateProduct = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const productData = req.body;
			// In a real app, update in database
			res
				.status(200)
				.json({ success: true, data: { id: parseInt(id), ...productData } });
		} catch (error) {
			res
				.status(500)
				.json({ success: false, message: "Failed to update product" });
		}
	};

	// Delete product
	public deleteProduct = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			// In a real app, delete from database
			res.status(200).json({ success: true, message: `Product ${id} deleted` });
		} catch (error) {
			res
				.status(500)
				.json({ success: false, message: "Failed to delete product" });
		}
	};
}
