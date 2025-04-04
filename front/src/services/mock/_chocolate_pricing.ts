import { PriceData } from "../api/chocolateService";

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
	messageBasePrice: 1.99,
	messageCharPrice: 0.15,
};

export default mockPriceData;
