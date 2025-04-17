import { Request, Response } from "express";
import { API } from "../constants/api";
import { MESSAGES } from "../constants/messages";
import { pool } from "../config/database";
import {
	ChocolateType,
	ChocolateShape,
	PackagingType,
	Topping,
	CustomChocolateData,
} from "../types/chocolate";

export class ChocolateController {
	/**
	 * Get all available chocolate types
	 */
	public getChocolateTypes = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const [rows] = await pool.query(
				"SELECT p.product_id as id, p.product_name as name, p.product_price as price, " +
					"pd.product_des as description, pi.image_url as imageUrl, " +
					"CASE " +
					"  WHEN LOWER(p.product_name) LIKE '%dark%' THEN 'dark' " +
					"  WHEN LOWER(p.product_name) LIKE '%milk%' THEN 'milk' " +
					"  WHEN LOWER(p.product_name) LIKE '%white%' THEN 'white' " +
					"  ELSE 'milk' " +
					"END as type " +
					"FROM product p " +
					"LEFT JOIN product_description pd ON p.product_id = pd.product_id " +
					"LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = TRUE " +
					"WHERE p.product_category = 'base' AND p.product_status = TRUE"
			);

			const chocolateTypes = (rows as any[]).map((row) => ({
				id: row.id,
				type: row.type,
				name: row.name,
				description: row.description,
				imageUrl: row.imageUrl,
				price: parseFloat(row.price),
			}));

			res.status(API.STATUS_CODES.OK).json(chocolateTypes);
		} catch (error) {
			console.error("Error fetching chocolate types:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: "Failed to fetch chocolate types",
			});
		}
	};

	/**
	 * Get all available toppings
	 */
	public getToppings = async (req: Request, res: Response): Promise<void> => {
		try {
			const [rows] = await pool.query(
				"SELECT p.product_id as id, p.product_name as name, p.product_price as price, " +
					"pd.product_des as description, pi.image_url as imageUrl " +
					"FROM product p " +
					"LEFT JOIN product_description pd ON p.product_id = pd.product_id " +
					"LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = TRUE " +
					"WHERE p.product_category = 'topping' AND p.product_status = TRUE"
			);

			const toppings = (rows as any[]).map((row) => ({
				id: row.id,
				type: row.name.toLowerCase().includes("nuts")
					? "nuts"
					: row.name.toLowerCase().includes("sprinkles")
					? "sprinkles"
					: row.name.toLowerCase().includes("fruits")
					? "fruit"
					: row.name.toLowerCase().includes("no toppings")
					? "none"
					: "none",
				name: row.name,
				description: row.description,
				imageUrl: row.imageUrl,
				price: parseFloat(row.price),
			}));

			res.status(API.STATUS_CODES.OK).json(toppings);
		} catch (error) {
			console.error("Error fetching toppings:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: "Failed to fetch toppings",
			});
		}
	};

	/**
	 * Get all available shapes
	 */
	public getShapes = async (req: Request, res: Response): Promise<void> => {
		try {
			const [rows] = await pool.query(
				"SELECT p.product_id as id, p.product_name as name, p.product_price as price, " +
					"pd.product_des as description, pi.image_url as imageUrl " +
					"FROM product p " +
					"LEFT JOIN product_description pd ON p.product_id = pd.product_id " +
					"LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = TRUE " +
					"WHERE p.product_category = 'shape' AND p.product_status = TRUE"
			);

			const shapes = (rows as any[]).map((row) => ({
				id: row.id,
				type: row.name.toLowerCase().includes("square")
					? "square"
					: row.name.toLowerCase().includes("round")
					? "round"
					: row.name.toLowerCase().includes("heart")
					? "heart"
					: "square",
				name: row.name,
				description: row.description,
				imageUrl: row.imageUrl,
				price: parseFloat(row.price),
			}));

			res.status(API.STATUS_CODES.OK).json(shapes);
		} catch (error) {
			console.error("Error fetching shapes:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: "Failed to fetch shapes",
			});
		}
	};

	/**
	 * Get all available packaging options
	 */
	public getPackagingOptions = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			// Updated query to include packaging_type
			const [rows] = await pool.query(
				"SELECT packaging_id as id, packaging_name as name, packaging_type as type, " +
					"packaging_price as price, packaging_image as imageUrl " +
					"FROM packaging " +
					"WHERE is_available = TRUE"
			);

			// Use the explicit type field from the database with fallback to prevent nulls
			const packagingOptions = (rows as any[]).map((row) => ({
				id: row.id,
				type: row.type || row.name.toLowerCase().replace(/ /g, "-"),
				name: row.name,
				description: `${row.name} packaging option`,
				imageUrl: row.imageUrl,
				price: parseFloat(row.price),
				features: ["Beautiful presentation", "Protective packaging"],
			}));

			res.status(API.STATUS_CODES.OK).json(packagingOptions);
		} catch (error) {
			console.error("Error fetching packaging options:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: "Failed to fetch packaging options",
			});
		}
	};

	/**
	 * Get pricing data for chocolate customization
	 */
	public getPricing = async (req: Request, res: Response): Promise<void> => {
		try {
			const [chocRows] = await pool.query(
				"SELECT product_id, product_name, product_price FROM product WHERE product_category = 'base'"
			);
			const [toppingRows] = await pool.query(
				"SELECT product_id, product_name, product_price FROM product WHERE product_category = 'topping'"
			);
			const [shapeRows] = await pool.query(
				"SELECT product_id, product_name, product_price FROM product WHERE product_category = 'shape'"
			);
			const [packagingRows] = await pool.query(
				"SELECT packaging_id, packaging_name, packaging_type, packaging_price FROM packaging WHERE is_available = TRUE"
			);
			const [priceRows] = await pool.query(
				"SELECT specifications FROM product_description pd JOIN product p ON pd.product_id = p.product_id " +
					"WHERE p.product_name = 'Custom Options Pricing'"
			);


			// Transform the data into the pricing structure
			const priceData = {
				baseChocolate: {} as Record<string, number>,
				toppings: {} as Record<string, number>,
				shapes: {} as Record<string, number>,
				packaging: {} as Record<string, number>,
				messageBasePrice: 2.99,
				messageCharPrice: 0.25,
			};

			// Process chocolate types
			(chocRows as any[]).forEach((choc) => {
				let type = choc.product_name.toLowerCase().includes("dark")
					? "dark"
					: choc.product_name.toLowerCase().includes("milk")
					? "milk"
					: choc.product_name.toLowerCase().includes("white")
					? "white"
					: "milk";
				priceData.baseChocolate[type] = parseFloat(choc.product_price);
			});

			// Process toppings
			(toppingRows as any[]).forEach((topping) => {
				let type = topping.product_name.toLowerCase().includes("nuts")
					? "nuts"
					: topping.product_name.toLowerCase().includes("sprinkles")
					? "sprinkles"
					: topping.product_name.toLowerCase().includes("fruits")
					? "fruit"
					: topping.product_name.toLowerCase().includes("no topping")
					? "none"
					: "none";
				priceData.toppings[type] = parseFloat(topping.product_price);
			});

			// Process shapes
			(shapeRows as any[]).forEach((shape) => {
				let type = shape.product_name.toLowerCase().includes("square")
					? "square"
					: shape.product_name.toLowerCase().includes("round")
					? "round"
					: shape.product_name.toLowerCase().includes("heart")
					? "heart"
					: "square";
				priceData.shapes[type] = parseFloat(shape.product_price);
			});

			// Process packaging - use the explicit type field if available
			(packagingRows as any[]).forEach((pkg) => {
				let type =
					pkg.packaging_type ||
					(pkg.packaging_name.toLowerCase().includes("standard")
						? "standard"
						: pkg.packaging_name.toLowerCase().includes("gift")
						? "gift"
						: pkg.packaging_name.toLowerCase().includes("premium")
						? "premium"
						: pkg.packaging_name.toLowerCase().includes("eco")
						? "eco"
						: "standard");
				priceData.packaging[type] = parseFloat(pkg.packaging_price);
			});

			// Try to get message pricing from the database
			if (priceRows && (priceRows as any[]).length > 0) {
				try {
					const specs = JSON.parse((priceRows as any[])[0].specifications);
					if (specs.messageBasePrice)
						priceData.messageBasePrice = parseFloat(specs.messageBasePrice);
					if (specs.messageCharPrice)
						priceData.messageCharPrice = parseFloat(specs.messageCharPrice);
				} catch (e) {
					console.warn(
						"Could not parse message pricing from database, using defaults"
					);
				}
			}
			res.status(API.STATUS_CODES.OK).json(priceData);
		} catch (error) {
			console.error("Error fetching pricing data:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: "Failed to fetch pricing data",
			});
		}
	};

	/**
	 * Create a new custom chocolate order
	 */
	public createCustomOrder = async (
		req: Request,
		res: Response
	): Promise<void> => {
		const connection = await pool.getConnection();
		try {
			await connection.beginTransaction();

			const customData: CustomChocolateData = req.body;
			console.log("Received custom order data:", customData);

			// 1. Find the product IDs for each selected option
			const [baseChocolate] = await connection.query(
				"SELECT product_id, product_price FROM product WHERE product_category = 'base' AND " +
					"LOWER(product_name) LIKE ?",
				[`%${customData.chocolateType}%`]
			);

			const [shape] = await connection.query(
				"SELECT product_id, product_price FROM product WHERE product_category = 'shape' AND " +
					"LOWER(product_name) LIKE ?",
				[`%${customData.shape}%`]
			);

			// Modified to search by both packaging_type and packaging_name for better matching
			const [packaging] = await connection.query(
				"SELECT packaging_id, packaging_price FROM packaging WHERE " +
					"LOWER(packaging_type) = ? OR LOWER(packaging_name) LIKE ?",
				[customData.packaging.toLowerCase(), `%${customData.packaging}%`]
			);

			// Validate that we found all required components
			if (!(baseChocolate as any[]).length || !(shape as any[]).length) {
				throw new Error("Required chocolate components not found in database");
			}

			const baseChocolateId = (baseChocolate as any[])[0].product_id;
			const baseChocolatePrice = parseFloat(
				(baseChocolate as any[])[0].product_price
			);
			const shapeId = (shape as any[])[0].product_id;
			const shapePrice = parseFloat((shape as any[])[0].product_price);
			const packagingId = (packaging as any[]).length
				? (packaging as any[])[0].packaging_id
				: null;
			const packagingPrice = (packaging as any[]).length
				? parseFloat((packaging as any[])[0].packaging_price)
				: 0;

			// 2. Calculate price based on components
			let totalPrice = baseChocolatePrice + shapePrice + packagingPrice;

			// Calculate message price if applicable
			let messagePrice = 0;
			if (customData.message && customData.message.trim().length > 0) {
				// Get message pricing from database
				const [messagePricing] = await connection.query(
					"SELECT specifications FROM product_description pd JOIN product p ON pd.product_id = p.product_id " +
						"WHERE p.product_name = 'Custom Options Pricing'"
				);

				let messageBasePrice = 1.99;
				let messageCharPrice = 0.15;

				if ((messagePricing as any[]).length > 0) {
					try {
						const specs = JSON.parse((messagePricing as any[])[0].specifications);
						if (specs.messageBasePrice)
							messageBasePrice = parseFloat(specs.messageBasePrice);
						if (specs.messageCharPrice)
							messageCharPrice = parseFloat(specs.messageCharPrice);
					} catch (e) {
						console.warn("Could not parse message pricing from database");
					}
				}

				// Calculate message price: base price + (per character price * message length)
				messagePrice =
					messageBasePrice + messageCharPrice * customData.message.trim().length;
				totalPrice += messagePrice;
			}

			// Add toppings pricing
			let toppingIds: number[] = [];
			if (
				customData.toppings &&
				customData.toppings.length > 0 &&
				!customData.toppings.includes("none")
			) {
				for (const topping of customData.toppings) {
					const [toppingResult] = await connection.query(
						"SELECT product_id, product_price FROM product WHERE product_category = 'topping' AND LOWER(product_name) LIKE ?",
						[`%${topping}%`]
					);

					if ((toppingResult as any[]).length) {
						const toppingId = (toppingResult as any[])[0].product_id;
						const toppingPrice = parseFloat(
							(toppingResult as any[])[0].product_price
						);
						toppingIds.push(toppingId);
						totalPrice += toppingPrice;
					}
				}
			}

			// Round to 2 decimal places and ensure it's a number
			totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100;

			// 3. Create order record - assuming customer is already authenticated
			// For demo purposes, we'll use the first customer in the database
			const [customer] = await connection.query(
				"SELECT c_id FROM customer LIMIT 1"
			);
			const customerId = (customer as any[])[0].c_id;

			// Create order
			const [orderResult] = await connection.query(
				"INSERT INTO orders (c_id, shipping_address, total_amount) VALUES (?, ?, ?)",
				[customerId, "Customer shipping address", totalPrice]
			);
			const orderId = (orderResult as any).insertId;

			// 4. Create order item
			const [itemResult] = await connection.query(
				"INSERT INTO order_items (order_id, product_id, quantity, unit_price, is_custom) VALUES (?, ?, ?, ?, ?)",
				[orderId, baseChocolateId, 1, totalPrice, true]
			);
			const orderItemId = (itemResult as any).insertId;

			// 5. Create custom chocolate record
			const [customResult] = await connection.query(
				"INSERT INTO custom_chocolate (item_id, base_chocolate_id, shape_id, packaging_id, gift_message, font_style, custom_price) VALUES (?, ?, ?, ?, ?, ?, ?)",
				[
					orderItemId,
					baseChocolateId,
					shapeId,
					packagingId,
					customData.message || null,
					customData.messageFont || null,
					totalPrice,
				]
			);
			const customId = (customResult as any).insertId;

			// 6. Add toppings if any
			for (const toppingId of toppingIds) {
				await connection.query(
					"INSERT INTO custom_chocolate_toppings (custom_id, topping_id) VALUES (?, ?)",
					[customId, toppingId]
				);
			}

			await connection.commit();

			res.status(API.STATUS_CODES.CREATED).json({
				success: true,
				message: "Custom chocolate order created successfully",
				data: {
					orderId,
					customId,
					totalPrice,
				},
			});
		} catch (error) {
			await connection.rollback();
			console.error("Error creating custom chocolate order:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: "Failed to create custom chocolate order",
			});
		} finally {
			connection.release();
		}
	};

	/**
	 * Get custom chocolate order details by ID
	 */
	public getCustomChocolateOrder = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const { id } = req.params;

			// Get the custom chocolate basic info
			const [customRows] = await pool.query(
				"SELECT cc.custom_id, cc.gift_message, cc.font_style, cc.custom_price, " +
					"oi.order_id, oi.quantity, " +
					"p_base.product_name AS base_name, p_base.product_price AS base_price, " +
					"p_shape.product_name AS shape_name, p_shape.product_price AS shape_price, " +
					"pkg.packaging_name, pkg.packaging_price " +
					"FROM custom_chocolate cc " +
					"JOIN order_items oi ON cc.item_id = oi.item_id " +
					"JOIN product p_base ON cc.base_chocolate_id = p_base.product_id " +
					"JOIN product p_shape ON cc.shape_id = p_shape.product_id " +
					"LEFT JOIN packaging pkg ON cc.packaging_id = pkg.packaging_id " +
					"WHERE cc.custom_id = ?",
				[id]
			);

			if (!(customRows as any[]).length) {
				res.status(API.STATUS_CODES.NOT_FOUND).json({
					success: false,
					message: "Custom chocolate order not found",
				});
				return;
			}

			const customChocolate = (customRows as any[])[0];

			// Get the toppings for this custom chocolate
			const [toppingRows] = await pool.query(
				"SELECT p.product_name, p.product_price " +
					"FROM custom_chocolate_toppings cct " +
					"JOIN product p ON cct.topping_id = p.product_id " +
					"WHERE cct.custom_id = ?",
				[id]
			);

			const toppings = (toppingRows as any[]).map((row) => ({
				name: row.product_name,
				price: parseFloat(row.product_price),
			}));

			// Construct the response object
			const result = {
				customId: customChocolate.custom_id,
				orderId: customChocolate.order_id,
				baseChocolate: {
					name: customChocolate.base_name,
					price: parseFloat(customChocolate.base_price),
				},
				shape: {
					name: customChocolate.shape_name,
					price: parseFloat(customChocolate.shape_price),
				},
				packaging: customChocolate.packaging_name
					? {
							name: customChocolate.packaging_name,
							price: parseFloat(customChocolate.packaging_price),
					  }
					: null,
				toppings,
				message: customChocolate.gift_message,
				messageFont: customChocolate.font_style,
				totalPrice: parseFloat(customChocolate.custom_price),
				quantity: customChocolate.quantity,
			};

			res.status(API.STATUS_CODES.OK).json({
				success: true,
				data: result,
			});
		} catch (error) {
			console.error("Error fetching custom chocolate order:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: "Failed to fetch custom chocolate order",
			});
		}
	};
}
