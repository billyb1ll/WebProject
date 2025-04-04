import {
	ChocolateType,
	ChocolateShape,
	PackagingType,
	Topping,
} from "../../hooks/useChocolateConfigurator";

// Interfaces for API responses
export interface ChocolateOption {
	type: ChocolateType;
	label: string;
	description: string;
	image: string;
	price: number;
	product_id: number;
}

export interface ToppingOption {
	type: Topping;
	label: string;
	description: string;
	image: string;
	price: number;
}

export interface ShapeOption {
	type: ChocolateShape;
	label: string;
	description: string;
	image: string;
	price: number;
}

export interface PackagingOption {
	type: PackagingType;
	label: string;
	description: string;
	price: number;
	image: string;
	features: string[];
}

// Price data structure
export interface PriceData {
	baseChocolate: Record<ChocolateType, number>;
	toppings: Record<Topping, number>;
	shapes: Record<ChocolateShape, number>;
	packaging: Record<PackagingType, number>;
}

// Message pricing constants
export const MESSAGE_PRICING = {
	basePrice: 1.99,
	perCharPrice: 0.15,
};

// Mock Data
const mockChocolateTypes: ChocolateOption[] = [
	{
		type: "dark",
		label: "Dark Chocolate",
		description:
			"Rich and intense with 70% cocoa content. Perfect for those who appreciate a robust chocolate flavor with minimal sweetness.",
		image: "/images/chocolate-dark.jpg",
		price: 6.99,
		product_id: 1,
	},
	{
		type: "milk",
		label: "Milk Chocolate",
		description:
			"Smooth and creamy classic favorite. A perfect balance of sweetness and chocolate flavor that everyone loves.",
		image: "/images/chocolate-milk.jpg",
		price: 5.99,
		product_id: 2,
	},
	{
		type: "white",
		label: "White Chocolate",
		description:
			"Sweet and buttery with vanilla notes. A delicate flavor profile with a smooth, melt-in-your-mouth texture.",
		image: "/images/chocolate-white.jpg",
		price: 7.99,
		product_id: 3,
	},
];

const mockToppings: ToppingOption[] = [
	{
		type: "none",
		label: "No Toppings",
		description:
			"Pure chocolate experience with no added ingredients. Enjoy the authentic taste of our premium chocolate.",
		image: "/images/topping-none.jpg",
		price: 0,
	},
	{
		type: "nuts",
		label: "Mixed Nuts",
		description:
			"Almonds, hazelnuts, and pecans. A perfect combination of crunchy nuts that complement the smooth chocolate.",
		image: "/images/topping-nuts.jpg",
		price: 1.99,
	},
	{
		type: "sprinkles",
		label: "Colorful Sprinkles",
		description:
			"Fun and festive decoration that adds a pop of color and a slight crunch to your chocolate creation.",
		image: "/images/topping-sprinkles.jpg",
		price: 0.99,
	},
	{
		type: "fruit",
		label: "Dried Fruits",
		description:
			"Berries and citrus zest that add a natural sweetness and tangy flavor to complement the chocolate.",
		image: "/images/topping-fruit.jpg",
		price: 1.49,
	},
];

const mockShapes: ShapeOption[] = [
	{
		type: "square",
		label: "Square",
		description: "Classic square shape. Timeless and elegant.",
		image: "/images/shape-square.jpg",
		price: 0,
	},
	{
		type: "round",
		label: "Round",
		description: "Smooth round shape for a modern look.",
		image: "/images/shape-round.jpg",
		price: 1.5,
	},
	{
		type: "heart",
		label: "Heart",
		description: "Romantic heart shape. Perfect for special occasions.",
		image: "/images/shape-heart.jpg",
		price: 2.5,
	},
];

const mockPackaging: PackagingOption[] = [
	{
		type: "standard",
		label: "Standard Box",
		description: "Simple and elegant packaging for everyday gifting.",
		price: 0,
		image: "/images/packaging-standard.jpg",
		features: ["Brown kraft box", "Recyclable", "Simple design"],
	},
	{
		type: "gift",
		label: "Gift Package",
		description: "Beautiful box with ribbon for special occasions.",
		price: 3.99,
		image: "/images/packaging-gift.jpg",
		features: ["Satin ribbon", "Gift tag", "Elegant design"],
	},
	{
		type: "premium",
		label: "Premium Box",
		description: "Luxury wooden box with gold accents for memorable gifts.",
		price: 8.99,
		image: "/images/packaging-premium.jpg",
		features: ["Wooden box", "Gold foil accents", "Magnetic closure"],
	},
	{
		type: "eco",
		label: "Eco-Friendly",
		description: "Biodegradable packaging for environmentally conscious choices.",
		price: 1.99,
		image: "/images/packaging-eco.jpg",
		features: ["100% biodegradable", "Plant-based materials", "Zero plastic"],
	},
];

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

// API Service Methods
class ChocolateApiService {
	// Simulate API delay for realistic testing
	private simulateDelay = async () => {
		// Remove this in production
		return new Promise((resolve) => setTimeout(resolve, 500));
	};

	/**
	 * Get chocolate type options
	 * @returns List of available chocolate types with details
	 *
	 * To replace with API:
	 * return fetch('/api/chocolate-types').then(res => res.json());
	 */
	async getChocolateTypes(): Promise<ChocolateOption[]> {
		await this.simulateDelay();
		return [...mockChocolateTypes];
	}

	/**
	 * Get available toppings
	 * @returns List of topping options with details
	 *
	 * To replace with API:
	 * return fetch('/api/toppings').then(res => res.json());
	 */
	async getToppings(): Promise<ToppingOption[]> {
		await this.simulateDelay();
		return [...mockToppings];
	}

	/**
	 * Get available chocolate shapes
	 * @returns List of shape options with details
	 *
	 * To replace with API:
	 * return fetch('/api/shapes').then(res => res.json());
	 */
	async getShapes(): Promise<ShapeOption[]> {
		await this.simulateDelay();
		return [...mockShapes];
	}

	/**
	 * Get packaging options
	 * @returns List of packaging options with details
	 *
	 * To replace with API:
	 * return fetch('/api/packaging').then(res => res.json());
	 */
	async getPackagingOptions(): Promise<PackagingOption[]> {
		await this.simulateDelay();
		return [...mockPackaging];
	}

	/**
	 * Get pricing data
	 * @returns Price information for all components
	 *
	 * To replace with API:
	 * return fetch('/api/pricing').then(res => res.json());
	 */
	async getPricing(): Promise<PriceData> {
		await this.simulateDelay();
		return { ...mockPriceData };
	}
}

// Export singleton instance
export const chocolateApi = new ChocolateApiService();
