import { ChocolateConfig } from "../../hooks/useChocolateConfigurator";
import {
	chocolateService,
	PriceData,
} from "../../services/api/chocolateService";

// Cache for pricing data to avoid unnecessary API calls
let pricingCache: PriceData | null = null;

/**
 * Calculate the price of a message based on its content
 * @param message The message text
 * @returns The calculated price: base price + per character fee
 */
function calculateMessagePrice(message: string): number {
	if (!message || !pricingCache) return 0;
	return (
		pricingCache.messageBasePrice + message.length * pricingCache.messageCharPrice
	);
}

/**
 * Calculate the price of a chocolate configuration
 * @param config The current chocolate configuration
 * @returns Object containing subtotal and detailed price breakdown
 */
export async function calculatePriceAsync(config: ChocolateConfig): Promise<{
	subtotal: number;
	details: Record<string, number>;
}> {
	// Get pricing data from API (or cache)
	if (!pricingCache) {
		pricingCache = await chocolateService.getPricing();
	}

	const pricing = pricingCache;

	// Start with base chocolate price
	const basePrice = pricing.baseChocolate[config.chocolateType];

	// Add shape cost
	const shapePrice = pricing.shapes[config.shape];

	// Add packaging cost
	const packagingPrice = pricing.packaging[config.packaging];

	// Calculate toppings cost
	let toppingsPrice = 0;
	if (config.toppings.length > 0 && !config.toppings.includes("none")) {
		config.toppings.forEach((topping) => {
			toppingsPrice += pricing.toppings[topping];
		});
	}

	// Dynamic message pricing based on character count
	const messagePrice = calculateMessagePrice(config.message);

	// Calculate subtotal
	const subtotal =
		basePrice + shapePrice + packagingPrice + toppingsPrice + messagePrice;

	return {
		subtotal,
		details: {
			base: basePrice,
			shape: shapePrice,
			packaging: packagingPrice,
			toppings: toppingsPrice,
			message: messagePrice,
		},
	};
}

/**
 * Synchronous version of calculatePrice that uses cached pricing data
 * This is a fallback for components that cannot use async functions
 */
export function calculatePrice(config: ChocolateConfig): {
	subtotal: number;
	details: Record<string, number>;
} {
	// If we don't have pricing data yet, return zeros
	if (!pricingCache) {
		console.warn(
			"Pricing data not loaded yet, using zeros. Call loadPricingData() first."
		);
		return {
			subtotal: 0,
			details: {
				base: 0,
				shape: 0,
				packaging: 0,
				toppings: 0,
				message: 0,
			},
		};
	}

	const pricing = pricingCache;

	// Rest of the calculation is the same as the async version
	const basePrice = pricing.baseChocolate[config.chocolateType];
	const shapePrice = pricing.shapes[config.shape];
	const packagingPrice = pricing.packaging[config.packaging];

	let toppingsPrice = 0;
	if (config.toppings.length > 0 && !config.toppings.includes("none")) {
		config.toppings.forEach((topping) => {
			toppingsPrice += pricing.toppings[topping];
		});
	}

	const messagePrice = calculateMessagePrice(config.message);
	const subtotal =
		basePrice + shapePrice + packagingPrice + toppingsPrice + messagePrice;

	return {
		subtotal,
		details: {
			base: basePrice,
			shape: shapePrice,
			packaging: packagingPrice,
			toppings: toppingsPrice,
			message: messagePrice,
		},
	};
}

/**
 * Helper function to preload pricing data
 */
export async function loadPricingData(): Promise<void> {
	if (!pricingCache) {
		try {
			pricingCache = await chocolateService.getPricing();
		} catch (error) {
			console.error("Failed to load pricing data:", error);
			throw error;
		}
	}
}

/**
 * Format price to currency string
 */
export function formatPrice(price: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
}
