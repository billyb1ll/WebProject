import { Request, Response } from "express";
import { Product } from "../types/product";
import { MESSAGES } from "../constants/messages";
import { API } from "../constants/api";
import { pool } from "../config/database";

export class ProductController {
	/**
	 * Fetches all active products from the database
	 * @debug Check SQL query if products aren't displaying correctly
	 */
	public getAllProducts = async (req: Request, res: Response): Promise<void> => {
		try {
			const [products] = await pool.query(
				"SELECT * FROM product WHERE product_status = TRUE AND deleted_at IS NULL"
			);
			res.status(API.STATUS_CODES.OK).json({ success: true, data: products });
		} catch (error) {
			console.error("Error fetching products:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({ 
				success: false, 
				message: MESSAGES.PRODUCT.FETCH_ALL_ERROR 
			});
		}
	};

	/**
	 * Fetches products filtered by category
	 * @debug If category filtering fails, verify parameter passing and SQL query
	 */
	public getProductsByCategory = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const { category } = req.params;
			console.debug(`Fetching products for category: ${category}`); // Debug log

			const [products] = await pool.query(
				"SELECT p.*, pd.product_des, pd.specifications FROM product p " +
					"LEFT JOIN product_description pd ON p.product_id = pd.product_id " +
					"WHERE p.product_category = ? AND p.product_status = TRUE AND p.deleted_at IS NULL",
				[category]
			);

			const productList = products as any[];

			if (productList.length === 0) {
				res.status(API.STATUS_CODES.OK).json({
					success: true,
					message: `No products found in category: ${category}`,
					data: [],
				});
				return;
			}

			res.status(API.STATUS_CODES.OK).json({
				success: true,
				data: productList,
			});
		} catch (error) {
			console.error("Error fetching products by category:", error);
			res
				.status(API.STATUS_CODES.SERVER_ERROR)
				.json({ success: false, message: MESSAGES.PRODUCT.FETCH_ALL_ERROR });
		}
	};

	/**
	 * Fetches product with associated images
	 * @debug Common failure point when product images aren't loading - check joins and image paths
	 */
	public getProductWithImages = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const { id } = req.params;
			console.debug(`Fetching product with images for ID: ${id}`); // Debug log

			const [productRows] = await pool.query(
				"SELECT p.*, pd.product_des, pd.specifications FROM product p " +
					"LEFT JOIN product_description pd ON p.product_id = pd.product_id " +
					"WHERE p.product_id = ? AND p.product_status = TRUE AND p.deleted_at IS NULL",
				[id]
			);

			const products = productRows as any[];

			if (products.length === 0) {
				console.debug(`Product not found with ID: ${id}`); // Debug log
				res.status(API.STATUS_CODES.NOT_FOUND).json({
					success: false,
					message: MESSAGES.PRODUCT.NOT_FOUND,
				});
				return;
			}

			const [imageRows] = await pool.query(
				"SELECT image_id, image_url, is_primary FROM product_images WHERE product_id = ?",
				[id]
			);

			console.debug(
				`Found ${(imageRows as any[]).length} images for product ID: ${id}`
			); // Debug log

			const productWithImages = {
				...products[0],
				images: imageRows,
			};

			res.status(API.STATUS_CODES.OK).json({
				success: true,
				data: productWithImages,
			});
		} catch (error) {
			console.error("Error fetching product with images:", error);
			res
				.status(API.STATUS_CODES.SERVER_ERROR)
				.json({ success: false, message: MESSAGES.PRODUCT.FETCH_ONE_ERROR });
		}
	};

	public getProductById = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const [rows] = await pool.query(
				"SELECT p.*, pd.product_des, pd.specifications FROM product p " +
					"LEFT JOIN product_description pd ON p.product_id = pd.product_id " +
					"WHERE p.product_id = ? AND p.product_status = TRUE AND p.deleted_at IS NULL",
				[id]
			);

			const products = rows as any[];

			if (products.length === 0) {
				res.status(API.STATUS_CODES.NOT_FOUND).json({
					success: false,
					message: MESSAGES.PRODUCT.NOT_FOUND,
				});
				return;
			}

			res.status(API.STATUS_CODES.OK).json({
				success: true,
				data: products[0],
			});
		} catch (error) {
			console.error("Error fetching product:", error);
			res
				.status(API.STATUS_CODES.SERVER_ERROR)
				.json({ success: false, message: MESSAGES.PRODUCT.FETCH_ONE_ERROR });
		}
	};

	/**
	 * Creates a new product with optional description
	 * @debug For product creation failures, check transaction handling and DB constraints
	 */
	public createProduct = async (req: Request, res: Response): Promise<void> => {
		try {
			const productData = req.body;
			console.debug(
				"Creating product with data:",
				JSON.stringify(productData, null, 2)
			); // Debug log

			const connection = await pool.getConnection();
			await connection.beginTransaction();

			try {
				const [result]: any = await connection.query(
					"INSERT INTO product (product_name, product_status, product_quantities, product_price, product_category) VALUES (?, ?, ?, ?, ?)",
					[
						productData.name,
						productData.status || true,
						productData.quantities || 0,
						productData.price,
						productData.category,
					]
				);

				const productId = result.insertId;
				console.debug(`Product created with ID: ${productId}`); // Debug log

				if (productData.description) {
					await connection.query(
						"INSERT INTO product_description (product_id, product_des, specifications) VALUES (?, ?, ?)",
						[
							productId,
							productData.description,
							productData.specifications
								? JSON.stringify(productData.specifications)
								: null,
						]
					);
				}

				await connection.commit();
				console.debug("Transaction committed successfully"); // Debug log

				res
					.status(API.STATUS_CODES.CREATED)
					.json({ success: true, data: { id: productId, ...productData } });
			} catch (error) {
				await connection.rollback();
				console.error("Transaction rolled back due to error:", error); // Debug log
				throw error;
			} finally {
				connection.release();
			}
		} catch (error) {
			console.error("Error creating product:", error);
			res
				.status(API.STATUS_CODES.SERVER_ERROR)
				.json({ success: false, message: MESSAGES.PRODUCT.CREATE_ERROR });
		}
	};

	public updateProduct = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const productData = req.body;

			const connection = await pool.getConnection();
			await connection.beginTransaction();

			try {
				await connection.query(
					"UPDATE product SET product_name = ?, product_status = ?, product_quantities = ?, product_price = ?, product_category = ?, updated_at = CURRENT_TIMESTAMP WHERE product_id = ?",
					[
						productData.name,
						productData.status !== undefined ? productData.status : true,
						productData.quantities !== undefined ? productData.quantities : 0,
						productData.price,
						productData.category,
						id,
					]
				);

				const [rows]: any = await connection.query(
					"SELECT 1 FROM product_description WHERE product_id = ?",
					[id]
				);

				const descExists = rows as any[];

				if (productData.description) {
					if (descExists.length > 0) {
						await connection.query(
							"UPDATE product_description SET product_des = ?, specifications = ? WHERE product_id = ?",
							[
								productData.description,
								productData.specifications
									? JSON.stringify(productData.specifications)
									: null,
								id,
							]
						);
					} else {
						await connection.query(
							"INSERT INTO product_description (product_id, product_des, specifications) VALUES (?, ?, ?)",
							[
								id,
								productData.description,
								productData.specifications
									? JSON.stringify(productData.specifications)
									: null,
							]
						);
					}
				}

				await connection.commit();

				res
					.status(API.STATUS_CODES.OK)
					.json({ success: true, data: { id: parseInt(id), ...productData } });
			} catch (error) {
				await connection.rollback();
				throw error;
			} finally {
				connection.release();
			}
		} catch (error) {
			console.error("Error updating product:", error);
			res
				.status(API.STATUS_CODES.SERVER_ERROR)
				.json({ success: false, message: MESSAGES.PRODUCT.UPDATE_ERROR });
		}
	};

	/**
	 * Fetches a list of featured products for the homepage
	 * @debug Check SQL query if featured products aren't displaying correctly
	 */
	public getFeaturedProducts = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			// First check if we have any products at all in the database
			const [countResult] = await pool.query(
				"SELECT COUNT(*) as count FROM product WHERE product_status = TRUE AND deleted_at IS NULL"
			);

			const totalCount = (countResult as any[])[0].count;
			console.debug(`Total active products in database: ${totalCount}`);

			if (totalCount === 0) {
				console.debug("No products found in the database");
				res.status(API.STATUS_CODES.OK).json({
					success: true,
					message: "No products available in the catalog",
					data: [],
				});
				return;
			}

			// Get featured products - these could be products with high sales, marked as featured,
			// or simply the most recent products depending on your business logic
			const [products] = await pool.query(
				"SELECT p.*, pd.product_des, pd.specifications FROM product p " +
					"LEFT JOIN product_description pd ON p.product_id = pd.product_id " +
					"WHERE p.product_status = TRUE AND p.deleted_at IS NULL " +
					"ORDER BY p.product_sold DESC, p.created_at DESC LIMIT 10"
			);

			// Get images for the featured products
			const productList = products as any[];
			console.debug(`Found ${productList.length} featured products`);

			if (productList.length === 0) {
				console.debug("No products match the featured criteria");
				res.status(API.STATUS_CODES.OK).json({
					success: true,
					data: [], // Return empty array instead of error
					message: "No featured products found",
				});
				return;
			}

			// Get product IDs for fetching images
			const productIds = productList.map((product) => product.product_id);
			console.debug(
				`Fetching images for ${productIds.length} products:`,
				productIds
			);

			let productsWithImages;

			// Skip image fetching if there are no products
			if (productIds.length === 0) {
				res.status(API.STATUS_CODES.OK).json({
					success: true,
					data: [],
				});
				return;
			}

			try {
				// Only proceed with image query if we have products
				const [imageCountResult] = await pool.query(
					"SELECT COUNT(*) as count FROM product_images WHERE product_id IN (?)",
					[productIds]
				);

				const imageCount = (imageCountResult as any[])[0].count;
				console.debug(`Found ${imageCount} total images for all featured products`);

				if (imageCount > 0) {
					// Use a proper SQL IN clause that works with arrays
					const placeholders = productIds.map(() => "?").join(",");

					// Only execute if we have valid placeholders
					if (placeholders) {
						const [imageRows] = await pool.query(
							`SELECT * FROM product_images WHERE product_id IN (${placeholders})`,
							productIds
						);

						const images = imageRows as any[];

						// Map images to their products
						productsWithImages = productList.map((product) => {
							const productImages = images.filter(
								(img) => img.product_id === product.product_id
							);

							return {
								...product,
								images: productImages || [],
							};
						});
					} else {
						productsWithImages = productList.map((product) => ({
							...product,
							images: [],
						}));
					}
				} else {
					// No images found, just return products without images
					productsWithImages = productList.map((product) => ({
						...product,
						images: [],
					}));
				}
			} catch (imageError) {
				console.error("Error fetching product images:", imageError);
				// If image fetching fails, still return the products without images
				productsWithImages = productList.map((product) => ({
					...product,
					images: [],
				}));
			}

			res.status(API.STATUS_CODES.OK).json({
				success: true,
				data: productsWithImages || productList, // Ensure we always return something
			});
		} catch (error) {
			console.error("Error fetching featured products:", error);
			res
				.status(API.STATUS_CODES.SERVER_ERROR)
				.json({ success: false, message: MESSAGES.PRODUCT.FETCH_ALL_ERROR });
		}
	};

	public deleteProduct = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;

			await pool.query(
				"UPDATE product SET deleted_at = CURRENT_TIMESTAMP, product_status = FALSE WHERE product_id = ?",
				[id]
			);

			res.status(API.STATUS_CODES.OK).json({
				success: true,
				message: MESSAGES.PRODUCT.DELETE_SUCCESS.replace("{id}", id),
			});
		} catch (error) {
			console.error("Error deleting product:", error);
			res
				.status(API.STATUS_CODES.SERVER_ERROR)
				.json({ success: false, message: MESSAGES.PRODUCT.DELETE_ERROR });
		}
	};
}
