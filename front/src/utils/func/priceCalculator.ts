import {
	ChocolateConfig,
	ChocolateType,
	ChocolateShape,
	PackagingType,
	Topping,
} from "../../hooks/useChocolateConfigurator";

// Mock price data - in production, these would come from API/database
interface PriceData {
	baseChocolate: Record<ChocolateType, number>;
	toppings: Record<Topping, number>;
	shapes: Record<ChocolateShape, number>;
	packaging: Record<PackagingType, number>;
}

const mockPriceData: PriceData = {
	baseChocolate: {
		dark: 6.99,
		milk: 5.99,
		white: 7.99,
	},
	toppings: {
		none: 0,
		nuts: 1.99,
		sprinkles: 0.99,
		fruit: 1.49,
	},
	shapes: {
		square: 0,
		round: 1.5,
		heart: 2.5,
	},
	packaging: {
		standard: 0,
		gift: 3.99,
		premium: 8.99,
		eco: 1.99,
	},
};

export function calculatePrice(config: ChocolateConfig): {
	subtotal: number;
	details: Record<string, number>;
} {
	// Start with base chocolate price
	const basePrice = mockPriceData.baseChocolate[config.chocolateType];

	// Add shape cost
	const shapePrice = mockPriceData.shapes[config.shape];

	// Add packaging cost
	const packagingPrice = mockPriceData.packaging[config.packaging];

	// Calculate toppings cost
	let toppingsPrice = 0;
	if (config.toppings.length > 0 && !config.toppings.includes("none")) {
		config.toppings.forEach((topping) => {
			toppingsPrice += mockPriceData.toppings[topping];
		});
	}

	// Message charge (if any)
	const messagePrice = config.message ? 1.99 : 0;

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

// Format price to currency string
export function formatPrice(price: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
}
