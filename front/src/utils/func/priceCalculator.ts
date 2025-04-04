import { ChocolateConfig } from "../../hooks/useChocolateConfigurator";
import {
	chocolateService,
	PriceData,
} from "../../services/api/chocolateService";
import mockPriceData from "../../services/mock/_chocolate_pricing";

// Cache for pricing data to avoid unnecessary API calls
let pricingCache: PriceData | null = null;

/**
 * Calculate the price of a message based on its content
 * @param message The message text
 * @returns The calculated price: base price + per character fee
 */
function calculateMessagePrice(message: string): number {
	if (!message || !pricingCache) return 0;

	// Explicitly extract and use the pricing data to avoid any undefined issues
	const basePrice = pricingCache.messageBasePrice || 0;
	const charPrice = pricingCache.messageCharPrice || 0;

	// Log this for debugging
	console.debug(
		`Message price calculation: base=${basePrice}, chars=${message.length}, charPrice=${charPrice}`
	);

	const total = basePrice + message.length * charPrice;
	return total;
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
	// Load pricing data if not already loaded
	if (!pricingCache) {
		pricingCache = await chocolateService.getPricing();
		console.log("Pricing data loaded:", pricingCache);
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

	// Debug logging
	console.debug("Price calculation result:", {
		basePrice,
		shapePrice,
		packagingPrice,
		toppingsPrice,
		messagePrice,
		subtotal,
	});

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
	// If we don't have pricing data yet, load it synchronously if possible
	if (!pricingCache) {
		console.warn(
			"Pricing data not loaded yet. Attempting to load synchronously."
		);
		try {
			// Use imported mock data directly
			pricingCache = mockPriceData;
			console.log("Loaded mock pricing data synchronously:", pricingCache);
		} catch (error) {
			console.error("Failed to load mock pricing data:", error);
			// Return zeros as fallback
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
	}

	const pricing = pricingCache;

	// Make sure pricing is not null before using it
	if (!pricing) {
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

	// Make sure we're using the absolutely latest message value
	const messagePrice = calculateMessagePrice(config.message);

	// Debug log
	console.debug(`Price calculation for config:`, {
		message: config.message,
		messagePrice,
		basePrice,
		shapePrice,
		packagingPrice,
		toppingsPrice,
	});

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
	try {
		console.log("Loading pricing data...");
		pricingCache = await chocolateService.getPricing();
		console.log("Pricing data loaded successfully:", pricingCache);
	} catch (error) {
		console.error("Failed to load pricing data:", error);
		throw error;
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

// Initialize by loading pricing data immediately
loadPricingData().catch((err) =>
	console.error("Failed to initialize pricing data:", err)
);
