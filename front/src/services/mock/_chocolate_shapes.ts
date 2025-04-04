import { ShapeOption } from "../api/chocolateService";

const mockShapes: ShapeOption[] = [
	{
		id: 1,
		type: "square",
		name: "Classic Square",
		description:
			"Traditional and elegant design. Perfect for gifting and sharing with friends and family.",
		imageUrl: "/images/shape-square.jpg",
		price: 0,
	},
	{
		id: 2,
		type: "round",
		name: "Elegant Round",
		description:
			"Smooth edges, perfect for gifting. A timeless shape that represents unity and perfection.",
		imageUrl: "/images/shape-round.jpg",
		price: 1.5,
	},
	{
		id: 3,
		type: "heart",
		name: "Romantic Heart",
		description:
			"Express your feelings with this shape. Ideal for anniversaries, Valentine's Day, or to show someone you care.",
		imageUrl: "/images/shape-heart.jpg",
		price: 2.5,
	},
];

export default mockShapes;
