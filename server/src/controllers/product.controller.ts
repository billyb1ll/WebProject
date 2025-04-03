import { Request, Response } from "express";
import { Product } from "../types/product";
import { MESSAGES } from "../constants/messages";
import { API } from "../constants/api";

export class ProductController {
	// Get all products
	public getAllProducts = async (req: Request, res: Response): Promise<void> => {
		try {
			// Mock data - in a real app, this would come from a database
			const products: Product[] = [
				{ id: 1, name: "Chocolate Bar", price: 2.99, category: "Regular" },
				{ id: 2, name: "Custom Box", price: 15.99, category: "Custom" },
			];

			res.status(API.STATUS_CODES.OK).json({ success: true, data: products });
		} catch (error) {
			res
				.status(API.STATUS_CODES.SERVER_ERROR)
				.json({ success: false, message: MESSAGES.PRODUCT.FETCH_ALL_ERROR });
		}
	};

	// Get product by ID
	public getProductById = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			// In a real app, fetch from database based on ID
			res.status(API.STATUS_CODES.OK).json({
				success: true,
				data: {
					id: parseInt(id),
					name: "Sample Product",
					price: 9.99,
					category: "Regular",
				},
			});
		} catch (error) {
			res
				.status(API.STATUS_CODES.SERVER_ERROR)
				.json({ success: false, message: MESSAGES.PRODUCT.FETCH_ONE_ERROR });
		}
	};

	// Create new product
	public createProduct = async (req: Request, res: Response): Promise<void> => {
		try {
			const productData = req.body;
			// In a real app, save to database
			res
				.status(API.STATUS_CODES.CREATED)
				.json({ success: true, data: { id: 3, ...productData } });
		} catch (error) {
			res
				.status(API.STATUS_CODES.SERVER_ERROR)
				.json({ success: false, message: MESSAGES.PRODUCT.CREATE_ERROR });
		}
	};

	// Update existing product
	public updateProduct = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const productData = req.body;
			// In a real app, update in database
			res
				.status(API.STATUS_CODES.OK)
				.json({ success: true, data: { id: parseInt(id), ...productData } });
		} catch (error) {
			res
				.status(API.STATUS_CODES.SERVER_ERROR)
				.json({ success: false, message: MESSAGES.PRODUCT.UPDATE_ERROR });
		}
	};

	// Delete product
	public deleteProduct = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			// In a real app, delete from database
			res.status(API.STATUS_CODES.OK).json({
				success: true,
				message: MESSAGES.PRODUCT.DELETE_SUCCESS.replace("{id}", id),
			});
		} catch (error) {
			res
				.status(API.STATUS_CODES.SERVER_ERROR)
				.json({ success: false, message: MESSAGES.PRODUCT.DELETE_ERROR });
		}
	};
}
