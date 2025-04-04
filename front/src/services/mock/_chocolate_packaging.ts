import { PackagingOption } from "../api/chocolateService";

const mockPackaging: PackagingOption[] = [
	{
		id: 1,
		type: "standard",
		name: "Standard Box",
		description: "Simple and elegant packaging for everyday gifting.",
		imageUrl: "/images/packaging-standard.jpg",
		price: 0,
		features: ["Brown kraft box", "Recyclable", "Simple design"],
	},
	{
		id: 2,
		type: "gift",
		name: "Gift Package",
		description: "Beautiful box with ribbon for special occasions.",
		imageUrl: "/images/packaging-gift.jpg",
		price: 3.99,
		features: ["Satin ribbon", "Gift tag", "Elegant design"],
	},
	{
		id: 3,
		type: "premium",
		name: "Premium Box",
		description: "Luxury wooden box with gold accents for memorable gifts.",
		imageUrl: "/images/packaging-premium.jpg",
		price: 8.99,
		features: ["Wooden box", "Gold foil accents", "Magnetic closure"],
	},
	{
		id: 4,
		type: "eco",
		name: "Eco-Friendly",
		description: "Biodegradable packaging for environmentally conscious choices.",
		imageUrl: "/images/packaging-eco.jpg",
		price: 1.99,
		features: ["100% biodegradable", "Plant-based materials", "Zero plastic"],
	},
];

export default mockPackaging;
