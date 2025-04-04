import { PaginatedProducts, Product } from "../api/productService";

// Sample product images
const productImages = [
	"https://images.unsplash.com/photo-1481391319762-47dff72954d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
	"https://images.unsplash.com/photo-1599599810769-bcde5a160d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
	"https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
	"https://images.unsplash.com/photo-1636743095923-151e66d8856b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
];

// Mock product data
const mockProducts: Product[] = [
	{
		id: 1,
		name: "Dark Chocolate Bar",
		description: "Rich dark chocolate made with 70% cocoa",
		price: 5.99,
		category: "Regular",
		quantities: 100,
		sold: 25,
		status: true,
		images: [
			{
				id: 1,
				productId: 1,
				imageUrl: productImages[0],
				isPrimary: true,
			},
		],
	},
	{
		id: 2,
		name: "Milk Chocolate Bar",
		description: "Smooth milk chocolate that melts in your mouth",
		price: 4.99,
		category: "Regular",
		quantities: 150,
		sold: 45,
		status: true,
		images: [
			{
				id: 2,
				productId: 2,
				imageUrl: productImages[1],
				isPrimary: true,
			},
		],
	},
	{
		id: 3,
		name: "White Chocolate Bar",
		description: "Sweet white chocolate with vanilla notes",
		price: 5.49,
		category: "Regular",
		quantities: 80,
		sold: 15,
		status: true,
		images: [
			{
				id: 3,
				productId: 3,
				imageUrl: productImages[2],
				isPrimary: true,
			},
		],
	},
	{
		id: 4,
		name: "Chocolate Gift Box",
		description: "Assorted chocolate collection in an elegant gift box",
		price: 19.99,
		category: "Gift",
		quantities: 50,
		sold: 30,
		status: true,
		images: [
			{
				id: 4,
				productId: 4,
				imageUrl: productImages[3],
				isPrimary: true,
			},
		],
	},
	{
		id: 5,
		name: "Chocolate Truffles",
		description: "Handcrafted chocolate truffles with ganache filling",
		price: 14.99,
		category: "Premium",
		quantities: 60,
		sold: 40,
		status: true,
		images: [
			{
				id: 5,
				productId: 5,
				imageUrl: productImages[0],
				isPrimary: true,
			},
		],
	},
	{
		id: 6,
		name: "Chocolate Covered Nuts",
		description: "Premium nuts covered in rich milk chocolate",
		price: 8.99,
		category: "Regular",
		quantities: 90,
		sold: 35,
		status: true,
		images: [
			{
				id: 6,
				productId: 6,
				imageUrl: productImages[1],
				isPrimary: true,
			},
		],
	},
];

// Mock paginated response
const mockPaginatedResponse: PaginatedProducts = {
	products: mockProducts,
	total: mockProducts.length,
	page: 1,
	limit: 10,
	totalPages: 1,
};

export default mockPaginatedResponse;
