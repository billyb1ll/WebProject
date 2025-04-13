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
	config: ChocolateConfig; // Chocolate configuration
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
		const cartJson = JSON.stringify(cart);
		Cookies.set(CART_COOKIE_NAME, cartJson, {
			expires: COOKIE_EXPIRY,
			sameSite: "strict",
		});
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

	// Create new cart item
	const newItem: CartItem = {
		id: generateCartItemId(),
		config,
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
