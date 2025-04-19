import { ChocolateConfig } from "../../hooks/useChocolateConfigurator";
import {
	chocolateService,
	PriceData,
} from "../../services/api/chocolateService";
import mockPriceData from "../../services/mock/_chocolate_pricing";

// Cache for pricing data to avoid unnecessary API calls
let pricingCache: PriceData | null = null;

// Flag to track if loading is in progress
let isLoadingPriceData = false;

// Promise to prevent multiple simultaneous loads
let loadingPromise: Promise<PriceData> | null = null;

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

	const total = basePrice + message.length * charPrice;
	return total;
}

/**
 * Helper function to preload pricing data
 * Using a promise to prevent multiple concurrent loads
 */
export async function loadPricingData(): Promise<PriceData> {
	if (pricingCache) {
		return pricingCache;
	}

	// If already loading, return the existing promise
	if (isLoadingPriceData && loadingPromise) {
		return loadingPromise;
	}

	// Set loading flag
	isLoadingPriceData = true;

	// Create a new loading promise
	loadingPromise = (async () => {
		try {
			console.log("Loading pricing data from API...");
			const apiData = await chocolateService.getPricing();
			console.log("Pricing data loaded successfully:", apiData);
			pricingCache = apiData;
			return apiData;
		} catch (error) {
			console.error("Failed to load pricing data:", error);
			// Fall back to mock data instead of throwing the error
			console.log("Falling back to mock pricing data");
			pricingCache = mockPriceData;
			console.log("Mock pricing data loaded:", pricingCache);
			return mockPriceData;
		} finally {
			isLoadingPriceData = false;
			loadingPromise = null;
		}
	})();

	return loadingPromise;
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
		pricingCache = await loadPricingData();
	}

	const pricing = pricingCache;

	// If pricing data is missing, return zeros to avoid NaN
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

	// Start with base chocolate price (with fallback to 0)
	const basePrice =
		(pricing.baseChocolate && pricing.baseChocolate[config.chocolateType]) || 0;

	// Add shape cost (with fallback to 0)
	const shapePrice = (pricing.shapes && pricing.shapes[config.shape]) || 0;

	// Add packaging cost (with fallback to 0)
	const packagingPrice =
		(pricing.packaging && pricing.packaging[config.packaging]) || 0;

	// Calculate toppings cost
	let toppingsPrice = 0;
	if (config.toppings.length > 0 && !config.toppings.includes("none")) {
		config.toppings.forEach((topping) => {
			// Add safety check to prevent NaN
			if (pricing.toppings && pricing.toppings[topping] !== undefined) {
				toppingsPrice += pricing.toppings[topping];
			}
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

			// Start async loading in the background to replace mock data with real data
			loadPricingData().then((realPricing) => {
				console.log("Real pricing data loaded in background, replacing mock data");
				pricingCache = realPricing;
			});
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
	const basePrice =
		(pricing.baseChocolate && pricing.baseChocolate[config.chocolateType]) || 0;
	const shapePrice = (pricing.shapes && pricing.shapes[config.shape]) || 0;

	// Improved packaging price lookup with better logging
	let packagingPrice = 0;
	if (pricing.packaging) {
		// Check if the packaging type exists in our pricing data
		if (config.packaging in pricing.packaging) {
			packagingPrice = pricing.packaging[config.packaging];
			console.debug(
				`Found packaging price for ${config.packaging}: ${packagingPrice}`
			);
		} else {
			console.warn(
				`Packaging type "${config.packaging}" not found in pricing data. Available types:`,
				Object.keys(pricing.packaging)
			);
			// Try case-insensitive matching as fallback
			const lowerCasePackaging = config.packaging.toLowerCase();
			const matchingKey = Object.keys(pricing.packaging).find(
				(key) => key.toLowerCase() === lowerCasePackaging
			);

			if (matchingKey) {
				packagingPrice = pricing.packaging[matchingKey];
				console.debug(
					`Found packaging price via case-insensitive match: ${packagingPrice}`
				);
			}
		}
	} else {
		console.warn("No packaging pricing data available");
	}

	let toppingsPrice = 0;
	if (config.toppings.length > 0 && !config.toppings.includes("none")) {
		config.toppings.forEach((topping) => {
			// Add safety check to prevent NaN
			if (pricing.toppings && pricing.toppings[topping] !== undefined) {
				toppingsPrice += pricing.toppings[topping];
			}
		});
	}

	// Make sure we're using the absolutely latest message value
	const messagePrice = calculateMessagePrice(config.message);

	// Debug log with focus on packaging
	console.debug(`Price calculation for config:`, {
		message: config.message,
		messagePrice,
		basePrice,
		shapePrice,
		packagingType: config.packaging,
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

// Export a function to check if pricing data is loaded
export function isPricingDataLoaded(): boolean {
	return pricingCache !== null;
}

// Export a function to get the current pricing data
export function getCurrentPricingData(): PriceData | null {
	return pricingCache;
}
