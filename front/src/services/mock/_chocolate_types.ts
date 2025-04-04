import { ChocolateOption } from "../api/chocolateService";

const mockChocolateTypes: ChocolateOption[] = [
	{
		id: 1,
		type: "dark",
		name: "Dark Chocolate",
		description:
			"Rich and intense with 70% cocoa content. Perfect for those who appreciate a robust chocolate flavor with minimal sweetness.",
		imageUrl: "/images/chocolate-dark.jpg",
		price: 6.99,
	},
	{
		id: 2,
		type: "milk",
		name: "Milk Chocolate",
		description:
			"Smooth and creamy classic favorite. A perfect balance of sweetness and chocolate flavor that everyone loves.",
		imageUrl: "/images/chocolate-milk.jpg",
		price: 5.99,
	},
	{
		id: 3,
		type: "white",
		name: "White Chocolate",
		description:
			"Sweet and buttery with vanilla notes. A delicate flavor profile with a smooth, melt-in-your-mouth texture.",
		imageUrl: "/images/chocolate-white.jpg",
		price: 7.99,
	},
];

export default mockChocolateTypes;
