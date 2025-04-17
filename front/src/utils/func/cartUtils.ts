/**
 * Cart Management System for Ratamoth Chocolate
 *
 * This module provides a complete shopping cart implementation using cookies for storage.
 * It allows users to add custom chocolates to cart, update quantities, and manage their selections.
 * The cart data persists between page refreshes and browser sessions.
 */

import { ChocolateConfig } from "../../hooks/useChocolateConfigurator";
import { formatPrice } from "./priceCalculator";
import Cookies from "js-cookie";

// Define the cart item structure
export interface CartItem {
	id: string; // Unique identifier for cart item
	config?: ChocolateConfig; // Chocolate configuration (optional for regular products)
	isCustom: boolean; // Flag to indicate if this is a custom chocolate or regular product
	productId?: number; // Product ID for regular products
	name: string; // Product name
	image?: string; // Product image URL
	price: number; // Price of the item
	quantity: number; // Quantity of this item
	createdAt: string; // When the item was added to cart
}

// Define the cart structure
export interface Cart {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
}

// Cookie name for storing the cart
const CART_COOKIE_NAME = "ratamoth_cart";
// Cookie expiry (in days)
const COOKIE_EXPIRY = 7;

// Initialize an empty cart
const emptyCart: Cart = {
	items: [],
	totalItems: 0,
	totalPrice: 0,
};

/**
 * Generate a unique ID for cart items
 * Uses timestamp + random string to ensure uniqueness
 * @returns {string} A unique identifier
 */
const generateCartItemId = (): string => {
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Get the current cart from cookies
 * Returns an empty cart if no cart exists or if there's an error parsing the cookie
 * @returns {Cart} The current cart object
 */
export const getCart = (): Cart => {
	try {
		const cartJson = Cookies.get(CART_COOKIE_NAME);
		if (!cartJson) return { ...emptyCart };

		const parsedCart = JSON.parse(cartJson) as Cart;

		// Ensure all required properties are present in each cart item's config
		parsedCart.items = parsedCart.items.map((item) => {
			// Make sure messageFont has a default value if missing
			if (item.config && !item.config.messageFont) {
				item.config.messageFont = "cursive";
			}
			return item;
		});

		return parsedCart;
	} catch (error) {
		console.error("Error parsing cart from cookie:", error);
		return { ...emptyCart };
	}
};

/**
 * Save the cart to cookies
 * Sets expiry date and security options
 * @param {Cart} cart - The cart object to save
 */
export const saveCart = (cart: Cart): void => {
	try {
		// Create a clean cart object without prototype references
		const cleanCart: Cart = {
			items: cart.items.map((item) => ({
				id: item.id,
				price: item.price,
				quantity: item.quantity,
				createdAt: item.createdAt,
				isCustom: item.isCustom,
				name: item.name,
				image: item.image,
				productId: item.productId,
				config: item.config
					? {
							chocolateType: item.config.chocolateType,
							toppings: [...item.config.toppings],
							shape: item.config.shape,
							packaging: item.config.packaging,
							message: item.config.message,
							messageFont: item.config.messageFont || "cursive",
					  }
					: undefined,
			})),
			totalItems: cart.totalItems,
			totalPrice: cart.totalPrice,
		};

		const cartJson = JSON.stringify(cleanCart);
		Cookies.set(CART_COOKIE_NAME, cartJson, {
			expires: COOKIE_EXPIRY,
			sameSite: "strict",
		});
		console.debug("Cart saved successfully:", cleanCart);
	} catch (error) {
		console.error("Error saving cart to cookie:", error);
	}
};

/**
 * Add an item to the cart
 * Creates a new cart item with the given configuration and adds it to the cart
 * @param {ChocolateConfig} config - The chocolate configuration
 * @param {number} price - The price of the item
 * @param {number} quantity - The quantity to add (defaults to 1)
 * @returns {CartItem} The newly created cart item
 */
export const addToCart = (
	config: ChocolateConfig,
	price: number,
	quantity: number = 1
): CartItem => {
	const cart = getCart();

	// Create new cart item with explicit properties to ensure serialization works
	const newItem: CartItem = {
		id: generateCartItemId(),
		config: {
			chocolateType: config.chocolateType,
			toppings: [...config.toppings],
			shape: config.shape,
			packaging: config.packaging,
			message: config.message,
			messageFont: config.messageFont || "cursive", // Ensure messageFont is included with fallback
		},
		isCustom: true,
		name: "Custom Chocolate",
		price,
		quantity,
		createdAt: new Date().toISOString(),
	};

	// Add to cart
	cart.items.push(newItem);

	// Update cart totals
	updateCartTotals(cart);

	// Save cart to cookie
	saveCart(cart);


	console.debug("Added item to cart:", newItem);

	return newItem;
};

/**
 * Add a regular product to the cart (not a custom chocolate)
 * If the product already exists in the cart, increase its quantity instead of adding a new item
 * @param {number} productId - The ID of the product
 * @param {string} name - Product name
 * @param {string} image - Product image URL
 * @param {number} price - The price of the product
 * @param {number} quantity - The quantity to add (defaults to 1)
 * @returns {CartItem} The cart item (either new or updated)
 */
export const addProductToCart = (
	productId: number,
	name: string,
	image: string,
	price: number,
	quantity: number = 1
): CartItem => {
	const cart = getCart();

	// Check if this product already exists in the cart (match by productId for regular products)
	const existingItemIndex = cart.items.findIndex(
		(item) => !item.isCustom && item.productId === productId
	);

	if (existingItemIndex !== -1) {
		// Product already exists, increment quantity instead of adding new item
		const existingItem = cart.items[existingItemIndex];
		cart.items[existingItemIndex].quantity += quantity;

		// Update cart totals
		updateCartTotals(cart);

		// Save cart to cookie
		saveCart(cart);

		return cart.items[existingItemIndex];
	}

	// Create new cart item for regular product
	const newItem: CartItem = {
		id: generateCartItemId(),
		isCustom: false,
		productId,
		name,
		image,
		price,
		quantity,
		createdAt: new Date().toISOString(),
	};

	// Add to cart
	cart.items.push(newItem);

	// Update cart totals
	updateCartTotals(cart);

	// Save cart to cookie
	saveCart(cart);

	return newItem;
};

/**
 * Update quantity of an item in the cart
 * If quantity is less than 1, the item is removed from the cart
 * @param {string} itemId - The ID of the item to update
 * @param {number} newQuantity - The new quantity
 * @returns {Cart} The updated cart
 */
export const updateCartItemQuantity = (
	itemId: string,
	newQuantity: number
): Cart => {
	if (newQuantity < 1) return removeFromCart(itemId);

	const cart = getCart();
	const itemIndex = cart.items.findIndex((item) => item.id === itemId);

	if (itemIndex !== -1) {
		cart.items[itemIndex].quantity = newQuantity;
		updateCartTotals(cart);
		saveCart(cart);
	}
	return cart;
};

/**
 * Remove an item from the cart
 * @param {string} itemId - The ID of the item to remove
 * @returns {Cart} The updated cart
 */
export const removeFromCart = (itemId: string): Cart => {
	const cart = getCart();
	cart.items = cart.items.filter((item) => item.id !== itemId);

	updateCartTotals(cart);
	saveCart(cart);

	return cart;
};

/**
 * Clear the entire cart
 * Resets to an empty cart state
 */
export const clearCart = (): void => {
	saveCart({ ...emptyCart });
};

/**
 * Update cart totals (total items and price)
 * Called automatically after cart modifications
 * @param {Cart} cart - The cart to update totals for
 */
export const updateCartTotals = (cart: Cart): void => {
	cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
	cart.totalPrice = cart.items.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
};

/**
 * Format the cart total as a price string
 * @returns {string} Formatted price string (e.g. "$10.00")
 */
export const getFormattedCartTotal = (): string => {
	const cart = getCart();
	return formatPrice(cart.totalPrice);
};

/**
 * Get the number of items in the cart
 * @returns {number} Total number of items
 */
export const getCartItemCount = (): number => {
	const cart = getCart();
	return cart.totalItems;
};

/**
 * Check if the cart is empty
 * @returns {boolean} True if cart has no items
 */
export const isCartEmpty = (): boolean => {
	const cart = getCart();
	return cart.items.length === 0;
};
