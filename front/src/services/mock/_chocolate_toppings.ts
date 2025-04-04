import { ToppingOption } from "../api/chocolateService";

const mockToppings: ToppingOption[] = [
	{
		id: 1,
		type: "none",
		name: "No Toppings",
		description:
			"Pure chocolate experience with no added ingredients. Enjoy the authentic taste of our premium chocolate.",
		imageUrl: "/images/topping-none.jpg",
		price: 0,
	},
	{
		id: 2,
		type: "nuts",
		name: "Mixed Nuts",
		description:
			"Almonds, hazelnuts, and pecans. A perfect combination of crunchy nuts that complement the smooth chocolate.",
		imageUrl: "/images/topping-nuts.jpg",
		price: 1.99,
	},
	{
		id: 3,
		type: "sprinkles",
		name: "Colorful Sprinkles",
		description:
			"Fun and festive decoration that adds a pop of color and a slight crunch to your chocolate creation.",
		imageUrl: "/images/topping-sprinkles.jpg",
		price: 0.99,
	},
	{
		id: 4,
		type: "fruit",
		name: "Dried Fruits",
		description:
			"Berries and citrus zest that add a natural sweetness and tangy flavor to complement the chocolate.",
		imageUrl: "/images/topping-fruit.jpg",
		price: 1.49,
	},
];

export default mockToppings;
